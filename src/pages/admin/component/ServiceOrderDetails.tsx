import { useState } from "react";
import { Meta, ServiceOrder } from "../../../types/types";


interface Props {
  order: ServiceOrder;
}

const formatLabel = (key: string) =>
  key
    .replace(/_/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (char) => char.toUpperCase());

const formatValue = (value: unknown): string => {
  if (value === null || value === undefined || value === "") {
    return "—";
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  if (Array.isArray(value)) {
    return value.map((item) => formatValue(item)).join(", ");
  }

  if (typeof value === "object") {
    return JSON.stringify(value, null, 2);
  }

  return String(value);
};

export default function ServiceOrderDetails({ order }: Props) {
  return (
    <section className="service-order-details">
      <div className="order-header">
        <div>
        <h2>{order.serviceName}</h2>
          <p>Order Id : {order.id}</p>
        </div>

        <strong>
          ₦{Number(order.price).toLocaleString("en-NG")}
        </strong>
      </div>

      <div className="order-meta">
        <div>
          <span>Purchase date</span>
          <p>{order.purchaseDate}</p>
        </div>

        {/* <div>
          <span>Service ID</span>
          <p>{order.serviceId}</p>
        </div> */}
      </div>
    
    <div className="dynamic-overral">
      <h3>Submitted Information</h3>

      <div className="dynamic-fields">
        {Object.entries(order.data ?? {}).map(([key, value]) => (
          <div className="dynamic-field" key={key}>
            <span>{formatLabel(key)}</span>
            <div className="dynamic-value">
              {typeof value === "string" &&
              /^https?:\/\/\S+$/i.test(value) ? (
                <a
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View file
                </a>
              ) : (
                <span>{formatValue(value)}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>

    </section>
  );
}
