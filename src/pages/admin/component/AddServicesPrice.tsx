import React, { useEffect, useRef, useState } from "react";
import ButtonPreloader from "../../../component/ButtonPreloader";
import { userAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { FieldType, FormFeature, FormField } from "../../../types/types";


type popType = {
  toggleToDefault : () => void;
}

 const  AddServicesPrice = ({toggleToDefault} : popType) => {

  const {baseUrl, token} = userAuth();
  
   const [name, setName] = useState<string>('');
      const [description, setDescription] = useState<string>('');
      const [price, setPrice] = useState<number>(0);
      const [loading, setLoading] = useState<boolean>(false);
      const [fields, setFields] = useState<FormField[]>([]);
      const [features, setFeature] = useState<FormFeature[]>([]);
      
   
       const addField = () => {
           const newField: FormField = {
             id: Date.now().toString(),
             label: '',
             name: '',
             type: 'text',
             is_required: false,
             options: []
           };
           setFields(prev => [...prev, newField]);
       };
   
       // FIXED
       const updateField = (id: string, updates: Partial<FormField>) => {
   
           setFields(prev => 
             prev.map(f => {
               if (f.id !== id) return f;
               const updated = { ...f, ...updates};
               if (updates.label !== undefined) {
                 updated.name = updates.label
                   .toLowerCase()
                   .trim()
                   .replace(/\s+/g, '_')
                   .replace(/[^a-z0-9_]/g, '');
               }
               if (updates.type && !['select', 'radio', 'checkbox'].includes(updates.type)) {
                     updated.options = [];
                }
               return updated;
             })
           );
       };
   
       // FIXED
       const removeField = (id: string) => {
         setFields(prev => prev.filter(f => f.id !== id));
       };

       const addFeature = () => {
           const newField: FormFeature = {
             id: Date.now().toString(),
             feature: ''
           };
           setFeature(prev => [...prev, newField]);
       };
   
     const updateFeature = (id: string, updates: string) => {
            setFeature((prevFeatures) =>
                prevFeatures.map((item) =>
                item.id === id
                    ? { ...item, feature: updates }
                    : item
                )
            );
        };
   
       // FIXED
       const removeFeature = (id: string) => {
         setFeature(prev => prev.filter(f => f.id !== id));
       };
        
      
        const validateProductForm = () => {
            if (!name.trim()) {
                toast.error("Service name is required");
                return false;
            }

            if (!price || isNaN(price) || Number(price) <= 0) {
                toast.error("Valid price is required");
                return false;
            }

            if (features.length < 1) {
            toast.error("At least one feature is required");
            return false;
            }

       
                for (const field of fields) {
                    if (!field.label.trim()) {
                    toast.error(`Label is required for a field`);
                    return false;
                    }
                    if (!field.name.trim()) {
                    toast.error(`Field name missing for "${field.label}"`);
                    return false;
                    }

                    // OPTION VALIDATION
                    if (['select', 'radio', 'checkbox'].includes(field.type)) {
                    if (!field.options || field.options.length === 0) {
                        toast.error(`Options required for "${field.label}" (${field.type})`);
                        return false;
                    }

                    // check empty options
                    const hasEmptyOption = field.options.some(opt => !opt.trim());
                    if (hasEmptyOption) {
                        toast.error(`Empty option found in "${field.label}" - please fill all options or delete empty ones`);
                        return false;
                    }

                    // check duplicate options
                    const uniqueOptions = new Set(field.options.map(o => o.toLowerCase().trim()));
                    if (uniqueOptions.size !== field.options.length) {
                        toast.error(`Duplicate options found in "${field.label}"`);
                        return false;
                    }
                    }
                }

             return true;
        };

        const saveForm = async () => {
            if(!validateProductForm()){
               return;
            }
           setLoading(true);
             const myHeaders = new Headers();
             myHeaders.append("Content-Type", "application/json");
             myHeaders.append("Authorization", token);
             const raw = JSON.stringify({
               "name" : name,
               "description" : description,
               "price" : price,
               "formField" : fields,
               "feature" : features
             });
             const requestOptions: RequestInit = {
                 method: "POST",
                 headers: myHeaders,
                 body: raw,
                 redirect: "follow"
             };
             try {
               const response = await fetch(`${baseUrl}/services-form`, requestOptions);
               setLoading(false); 
               if (!response.ok) {
                 const errorResponse = await response.json();  
                 throw new Error(errorResponse.message);
               }
               const result = await response.json();
               setName('');
               setPrice(0);
               setDescription('');
               setFields([]);
               setFeature([]);
               toast.success(result.message);
                
             } catch (error) {
                 setLoading(false);
                   if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
                     toast.error(error.message);
                   } else {
                     toast.error('An unknown error occurred.');
                   }          
                 setLoading(false);
                   if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
                     toast.error(error.message);
                   } else {
                     toast.error('An unknown error occurred.');
                   }
             }
         };



        return ( 

          <div>
          <div className="wrap-blog ">

        
            <div className="card">
                <div className="admin-input">
                    <label >Service Name</label>
                    <input 
                        placeholder="Service Name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                
                <div className="admin-input">
                    <label >Price</label>
                    <input 
                    type="number"
                    placeholder="price" 
                    value={price}
                    onChange={(e)=> setPrice(Number(e.target.value))}
                    />
                </div>
                
                <div className="admin-input">
                    <label>Description</label>
                    <textarea 
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    />
                </div>
                
            </div>

            <div className="card">
                <div className="fields-header">
                <h3>Service Feature</h3>
                <button onClick={addFeature} className="btn-add">+ Add Feature</button>
                </div>
        
                {features.map((field) => (

                <div key={field.id} className="field-card">

                  <div className="field-row">
                            <input
                                placeholder="feature"
                                value={field.feature}
                                onChange={(e)=> {
                                   updateFeature(field.id, e.target.value);
                                }}
                            />
                            <div 
                                className="btn-delete cursor-pointer"
                                onClick={() => removeFeature(field.id)}
                            >
                               X
                            </div>

                    </div>
                    </div>
                ))}

            </div>

            <div className="card">
                <div className="fields-header">
                <h3>Form Fields</h3>
                <button onClick={addField} className="btn-add">+ Add Field</button>
                </div>
        
                {fields.map((field) => (

                <div key={field.id} className="field-card">

                    <div className="cancel flex justification-end">
                         <div onClick={() => removeField(field.id)} className="btn-delete">X</div>
                    </div>

                    <div className="field-row">
                        <input 
                        placeholder="Label e.g. Company Name"
                        value={field.label}
                        onChange={(e) => updateField(field.id, {label: e.target.value })}
                        />
        
                        <select 
                        value={field.type}
                        onChange={e => updateField(field.id, {type: e.target.value as FieldType })}
                        >
                        <option value="text">Text</option>
                        <option value="textarea">Textarea</option>
                        <option value="number">Number</option>
                        <option value="email">Email</option>
                        <option value="select">Select</option>
                        <option value="radio">Radio</option>
                        <option value="checkbox">Checkbox</option>
                        <option value="file">File</option>
                        <option value="date">Date</option>
                        </select>
                    </div>

                    <div className="field-row justification-between">

                        <label className="flex-center gap-10">
                            Required
                        <input 
                            type="checkbox" 
                            checked={field.is_required} 
                            onChange={e => updateField(field.id, { is_required: e.target.checked })}
                        /> 
                        </label>
                    
                        {/* <button onClick={() => removeField(field.id)} className="btn-delete">Delete</button> */}
                    </div>
        
        
                    {(field.type === 'select' || field.type === 'radio' || field.type === 'checkbox') && (
                        <div className="options-editor">
                        <label>Options:</label>
                        {field.options?.map((opt, idx) => (
                            <div key={idx} className="field-row">
                            <input
                                placeholder={`Option ${idx + 1}`}
                                value={opt}
                                onChange={e => {
                                const newOptions = [...(field.options || [])];
                                newOptions[idx] = e.target.value;
                                updateField(field.id, { options: newOptions });
                                }}
                            />
                            <button 
                                type="button"
                                className="btn-delete"
                                onClick={() => {
                                const newOptions = field.options?.filter((_, i) => i !== idx);
                                updateField(field.id, { options: newOptions });
                                }}
                            >
                                X
                            </button>
                            </div>
                        ))}
                        
                        <button
                            type="button"
                            className="btn-add-small"
                            onClick={() => {
                            const newOptions = [...(field.options || []), ''];
                            updateField(field.id, { options: newOptions });
                            }}
                        >
                            + Add {field.type} Option
                        </button>
                        </div>
                    )}
        
                    
                    <small>Name: {field.name}</small>
                    </div>
                ))}

            </div>

          </div>
          {
                      loading ? (
                      <div className="admin-input">
                              <div className='inActive' style={{marginTop : "60px"}}><ButtonPreloader/></div>
                      </div>
                      ) : (
                      
                      <div className="admin-input">
                      <div className="btn" onClick={saveForm} style={{marginTop : "60px"}}>Submit</div>
                      </div> 
                      
                      //       <div className="admin-input inActive">
                      //         <div className="btn inActive">Submit</div>
                      //       </div> 
                      
                      
              )}
           
          
          </div>

        );
}


export default AddServicesPrice