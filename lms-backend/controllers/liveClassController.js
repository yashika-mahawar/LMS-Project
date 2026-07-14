import { supabase } from "../config/supabase.js";


export const getLiveClasses = async (req,res)=>{

try{

const {data,error}= await supabase
.from("live_classes")
.select(`
 id,
 topic,
 faculty,
 date,
 time,
 status,
 meet_link,
 courses(
 title
 )
`)
.order("date",{ascending:true});


if(error){
return res.status(500).json({
success:false,
error:error.message
})
}


res.json({
success:true,
data
})


}
catch(err){

res.status(500).json({
success:false,
error:err.message
})

}

}