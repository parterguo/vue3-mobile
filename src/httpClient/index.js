//引入封装的方法和接口域名
import { postRequest, getRequest } from "./axios";
import { baseUrl, baseUrl_New } from "./urlconfig";

export const postTypeList=(data)=>{
	return postRequest(`${baseUrl}/taptap/rank/typeList`,data)
}	
export const postRankList=(taskType,date)=>{
	return getRequest(`${baseUrl}/taptap/rank/rankList`,
	{"taskType":taskType,"date":date}
	)
}
export const getQueryData=(data)=>{
	return getRequest(`${baseUrl}/taptap/rank/queryData`,data
	)
}

export const postMockDemo=(data)=>{
	return postRequest(`${baseUrl_New}/api/test`,data)
}
//轮播列表 
export const postSwiper=(data)=>{
	return postRequest(`${baseUrl_New}/api/swiper`,data)
}

export const getDemo=(data)=>{
	return getRequest(`${baseUrl_New }/xxxx`,data)
}
// 注册用户
export const getaddUser=(data)=>{
	return postRequest(`${baseUrl_New }/api/user/login`,data)
}