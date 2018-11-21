// Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
export const getQueryString = q => {
  if (!q) return {}
  return (/^[?#]/.test(q) ? q.slice(1) : q)
    .split('&')
    .reduce((params, param) => {
      let [key, value] = param.split('=')
      params[key] = value ? decodeURIComponent(value) : ''
      return params
    }, {})
}
