import { useEffect, useState } from "react";
import axiosInstance from "../config/axiosInstance";
import { useSelector } from "react-redux";
import { ArrowRight } from "lucide-react";

function AuditPage() {
  const user = useSelector(state => state.user.user);
  const [auditsData, setAuditsData] = useState(null);

  useEffect(()=> {
    const getAllAudits = async () => {
     const response =  await axiosInstance.get('api/v1/audit/getAllChangeAudits',
      {
        headers: {
          Authorization: `Bearer ${user.accessToken}`
        }
      });

      setAuditsData(response.data);
    }

    getAllAudits();

  },[])

  return(

      <div className="w-1/2 mx-auto rounded-xl mt-6">
        <p className="text-lg text-center font-black text-white my-8">Changes Audit (Enhanced Tracking)</p>

        {auditsData?.map((data)=>(
          <div className="w-full border border-white p-4 rounded-xl my-4">
            <p className="text-lg font-medium text-white my-2">Character Id: {data?.characterId}</p>
            {data?.log?.map((log)=>(
              <div className="flex items-center gap-4">
                <p className="text-sm font-medium text-white">Field: {log?.field}</p>
                <p className="text-sm font-medium text-blue-300">{log?.from} <ArrowRight className="inline w-4 h-4 text-white" /> {log?.to} </p>
              </div>
            ))}
          </div>
        ))}

      </div> 
  )
}

export default AuditPage;