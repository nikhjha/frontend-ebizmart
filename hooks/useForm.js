import { useEffect, useRef, useState } from "react";
import getFetch from "../libs/axiosClient";
import { get, set, isEmpty } from "lodash";
import { formContentType, requestType } from "../constant/constant";

//Handle outside
//previousData will be :
//If no initial data or saved data
//previousData -> undefined
//If initiall value is give
//previousData -> value
//If saved data is available
//previousData -> if saved as json.string | value
//If multiple instance of same key exists
//previousData -> []

//If nested -> dont give stringified object as value
//and initial data will have array of values if multiple same key is given.

export default function useForm({
  postTo,
  validate,
  error,
  afterSave,
  afterSubmission,
  initialValues = {},
  contentType,
  customFetch,
  type = requestType.post,
}) {
  //All saved data till now
  const formData = useRef();
  //Initial data and saved data to query
  const [currentData, setCurrentData] = useState(initialValues);
  //Data to be send to validation
  const validationData = useRef({});
  //Is form in loading state or not
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    formData.current = new FormData();
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!isEmpty(initialValues)) {
      setCurrentData(initialValues);
    }
  }, [initialValues]);

  //Function to get Initial value or saved value
  const previousData = (key) => {
    return get(currentData, key);
  };

  const handleNesting = (data, save = false) => {
    //Groups of nested and normal data
    let nestedFormData = {};
    let normalFormData = {};
    //Deleting previous value of validation data
    validationData.current = {};
    for (var key of data.keys()) {
      const valueList = data.getAll(key);
      let value;
      //If single input name have single value saving it directly and if not saving it in array
      //key -> value | [value]
      if (valueList.length === 1) {
        value = valueList[0];
      } else {
        value = valueList;
      }
      //Classifing into normal and nested data;
      if (key.includes(".")) {
        //key.nest -> key = nest.value;
        set(nestedFormData, key, value);
      } else {
        set(normalFormData, key, value);
      }
      //saving it to validate and previous data
    }
    let combinedFormData = new FormData();
    for (const pair of Object.entries(nestedFormData)) {
      combinedFormData.append(pair[0], JSON.stringify(pair[1]));
      validationData.current[pair[0]] = pair[1];
    }
    for (const pair of Object.entries(normalFormData)) {
      if (Array.isArray(pair[1])) {
        pair[1].forEach((val) => {
          combinedFormData.append(key, val);
        });
        validationData.current[pair[0]] = pair[1];
        continue;
      }
      combinedFormData.append(pair[0], pair[1]);
      validationData.current[pair[0]] = pair[1];
    }
    if (save) {
      setCurrentData({ ...currentData, ...validationData.current });
    }
    //form preview
    //key -> string([value] | value) | [value] | value  ;
    //validation
    //key -> [value] | value;
    return combinedFormData;
  };

  const addData = (key, value) => {
    //if ![] if key exist update if not then add;
    if (formData.current.has(key) && value.constructor.name !== "File") {
      formData.current.set(key, value);
      return;
    }
    formData.current.append(key, value);
  };

  const handleSave = (e) => {
    //save the data to form data for further submission
    e.preventDefault();
    if (loading) {
      return;
    }
    const data = new FormData(e.currentTarget);
    const combinedFormData = handleNesting(data, true);
    const validation = validate(validationData.current);
    if (validation?.error) {
      if (validation?.message) {
        error(validation.message);
      }
      return;
    }
    for (var pair of combinedFormData.entries()) {
      addData(pair[0], pair[1]);
    }
    afterSave(validationData.current);
    console.log("Saved");
  };

  const handleSubmission = async (e) => {
    //submit all the formdata accordingly
    e.preventDefault();
    if (loading) {
      return;
    }
    setLoading(true);
    const data = new FormData(e.currentTarget);
    const combinedFormData = handleNesting(data);
    const validation = validate(validationData.current);
    console.log(validation);
    if (validation?.error) {
      if (validation?.message) {
        error(validation.message);
      }
      setLoading(false);
      return;
    }
    for (var pair of combinedFormData.entries()) {
      addData(pair[0], pair[1]);
    }
    let body;
    if (contentType === formContentType.formdata) {
      body = formData.current;
    } else {
      body = {};
      for (var pair of formData.current.entries()) {
        body[pair[0]] = pair[1];
      }
    }
    for (var pair of formData.current.entries()) {
      console.log(pair[0], pair[1]);
    }
    try {
      if (type === requestType.post) {
        if (customFetch) {
          const res = await customFetch.post(postTo, body);
          afterSubmission(res);
        } else {
          const clientFetch = getFetch();
          const res = await clientFetch.post(postTo, body);
          afterSubmission(res);
        }
      } else if (type === requestType.patch) {
        if (customFetch) {
          const res = await customFetch.patch(postTo, body);
          afterSubmission(res);
        } else {
          const clientFetch = getFetch();
          const res = await clientFetch.patch(postTo, body);
          afterSubmission(res);
        }
      }
      formData.current = new FormData();
    } catch (e) {
      console.log(e.response);
      error(
        e?.response
          ? e?.response?.data?.message
          : "Please check your net connection",
        e?.response
      );
    }
    setLoading(false);
    console.log("Submitted");
    return;
  };
  //things that can be used outside such as saving ,submitting taking previousData or checking loading state
  return { previousData, handleSave, handleSubmission, loading };
}
