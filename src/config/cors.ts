import {CorsOptions} from "cors";

export const optionCors:CorsOptions = {
  origin: function(origin,callback){
    const whiteList = [process.env.FRONTEND_URI]

    if(process.argv[2] === '--api'){
      whiteList.push(undefined)
    }

    if(whiteList.includes(origin)){
      callback(null,true)
    }else{
      callback(new Error('CORS ERROR!!'))
    }
  }
}