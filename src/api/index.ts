import request from "../utils/request";

export const login = (data: any) => {
  return request({
    method: "POST",
    url: "/login",
    // data用来设置POST请求体
    data
  })
};
export const register = (data: any) => {
  return request({
    method: "POST",
    url: "/regist",
    // data用来设置POST请求体
    data
  })
};

export const getBranchs = () => {
  return request({
    method: "POST",
    url: "/pblist",
  })
}

export const getActivitys = () => {
  return request({
    method: "POST",
    url: "/padata",
  })
}
export const addActivity = (data: object) => {
  return request({
    method: "POST",
    url: "/addpa",
    data
  })
}

export const getMembers = () => {
  return request({
    method: "POST",
    url: "/pmdata",
  })
}

export const deleteMember = (uid: number) => {
  return request({
    method: "POST",
    url: "/delpm",
    data: {
      id: uid
    }
  })
};
export const deleteActivity = (id: number) => {
  return request({
    method: "POST",
    url: "/delpa",
    data: {
      id: id
    }
  })
};
export const getMemberInfo = (uid: number) => {
  return request({
    method: "POST",
    url: "/pmdata",
    data: {
      id: uid
    }
  })
};
export const addMember = (data: any) => {
  return request({
    method: "POST",
    url: "/addpm",
    data
  })
};
export const editInfo = (data: any) => {
  return request({
    method: "POST",
    url: "/modifypm",
    data
  })
}
export const logout = (uid: String) => {
  return request({
    method: "POST",
    url: "/logout",
    data: {
      id: uid
    }
  })
}
export const getFees = (PartyFeeManage: number) => {
  return request({
    method: "POST",
    url: "pmdata",
    data: {
      PartyFeeManage
    }
  })
}