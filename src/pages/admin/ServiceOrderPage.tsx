
import { useEffect, useState } from "react";
import { Meta, ServiceOrder } from "../../types/types";
import { userAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { div, p } from "framer-motion/client";
import ServiceOrderDetails from "./component/ServiceOrderDetails";
import AdminPagination from "./component/AdminPagination";
import ButtonPreloader from "../../component/ButtonPreloader";




export default function ServiceOrderPage() {

  const [order, setOrder] = useState<ServiceOrder[]>([]);
   const {baseUrl, token} = userAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [page, setPage] = useState<number>(1);
  const [meta, setMeta] = useState<Meta | null>(null);

    useEffect(() => {
    getData()
    }, []);

    const getData = async () => {
            setLoading(true);
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", token);
            const requestOptions: RequestInit = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow"
            };
            try {
                const response = await fetch(`${baseUrl}/page-services-order`, requestOptions); 
                if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message);
                }
                const result = await response.json();           
                setOrder(result.data);
                setMeta(result.meta);
                setLoading(false);
            } catch (error) {
            setLoading(false);
            if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
            toast.error(error.message);
            } else {
            toast.error('An unknown error occurred.');
            }
                
            }
    }

  return (
    <div>

        {
            order  ? (
                loading ? (
                    <div>
                        <ButtonPreloader/>
                    </div>
                ) : (
                    order.map((item, index) => (
                        <div key={index}>
                            <ServiceOrderDetails order={item} />
                        </div>
                    
                    ))
                    
                )
            ) : (
                <p>no purchase yet</p>
            )
        }

        <div className="adminPagination">
            {meta && <AdminPagination meta={meta} onPageChange={setPage} />}
        </div>

      </div>
  )
}
