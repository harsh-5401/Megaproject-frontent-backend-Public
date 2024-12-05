import React from 'react'
import {toast} from "react-hot-toast"

import { catalogData } from '../apis';
import { apiconnector } from '../apiconnector';

export const getCatalogaPageData = async(categoryid) => {
  console.log("catehory id is ===" , categoryid)
  const toastId = toast.loading("Loading...");
  let result = [];
  try{
        const response = await apiconnector("POST", catalogData.CATALOGPAGEDATA_API, 
        {categoryid: categoryid,});
        console.log("Catalog page data response", response)
        if(!response?.data?.success)
            throw new Error("Could not Fetch Category page data");

         result = response?.data;

  }
  catch(error) {
    console.log("CATALOG PAGE DATA API ERROR....", error);
    toast.error(error.message);
    result = error.response?.data;
  }
  toast.dismiss(toastId);
  return result;
}

