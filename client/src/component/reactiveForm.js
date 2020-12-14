import React, { useState } from 'react';
import {connect} from 'react-redux';
import {saveUserDetails } from '../redux/action';
import { useFormik } from 'formik';
import * as yup from 'yup';
import "../App.css";

const ReactiveForm= (props)=>{
    const [ProcessedData,ActionToProsses]=useState({
        page:0,
        Education:[{
            institute:"",
            start:"",
            end:"",
            degree:"",
            current:""
        }],
        Career:[{
            Position:"",
            Companyname:"",
            start:"",
            end:""
        }]
    })

    let state = {
        email: "",
        name: "",
        phonenumber: "",
        dob: "",
        address:"",
        Education:[{
            institute:"",
            start:"",
            end:"",
            degree:"",
            current:""
        }],
        Career:[{
            Position:"",
            Companyname:"",
            start:"",
            end:""
        }],
        errors:{
        }
    }
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            phonenumber: "",
            dob: "",
            address:"",
            Education:[{
                institute:"",
                start:"",
                end:"",
                degree:"",
                current:""
            }],
            Career:[{
                Position:"",
                Companyname:"",
                start:"",
                end:""
            }],
            errors:{
            }
           
        },
        validationSchema: yup.object({
            name: yup.string()
                .required('Required'),
            phonenumber: yup.number()
                .min(10, 'Minimum 10 numbers required')
                .required('Required'),
            email: yup.string()
                .email('Invalid email')
                .required('Required'),
            dob: yup.string()
                .required('Required'),
            address: yup.string()
                .required('Required'),
            Education : yup.array().of(yup.object().shape({
                institute:yup.string()
                .required('Required'),
                degree: yup.string()
                .required('Required'),
            })),
            Career : yup.array().of(yup.object().shape({
                Position:yup.string()
                .required('Required'),
                Companyname: yup.string()
                .required('Required'),
            }))  
        }),
        onSubmit: (userInuptData) => {
            console.log(userInuptData)
            props.saveUserDetail(userInuptData)
           // console.log(userInuptData)
        }
    })

    const pageChangeInc= () =>{
        if(ProcessedData.page===0){
            if(formik.values.name
                &&formik.values.email
                &&formik.values.phonenumber
                &&formik.values.dob
                &&formik.values.address)
                ActionToProsses({...ProcessedData,page:ProcessedData.page+1}) 
        }

        else if(ProcessedData.page===1){
            let isDone=formik.values.Education.every((value)=> { 
                return (value.degree&&value.end&&value.institute&&value.start); 
            });
            if(isDone) ActionToProsses({...ProcessedData,page:ProcessedData.page+1}) 
        }

        if(ProcessedData.page===2){
            let isDone=formik.values.Career.every((value)=> { 
                return (value.Position&&value.end&&value.Companyname&&value.start); 
            });
            if(isDone) formik.handleSubmit()
            
        }
        
        console.log(formik) 
    }
    const pageChangeDec= () =>{
        ActionToProsses({...ProcessedData,page:ProcessedData.page-1}) 
    }

    const AddEducation=(e) =>{
        e.preventDefault()
        console.log(formik.initialValues.Education)
        let newEntry={
            institute:"",
            start:"",
            end:"",
            degree:"",
            current:""
        }
        formik.initialValues.Education.push(newEntry)
    ActionToProsses({...ProcessedData,Education:{...newEntry}})
     console.log(formik.values)
    }

    const AddCareer=(e) =>{
        e.preventDefault()
        console.log(formik.initialValues.Career)
        let newEntry={
            Position:"",
            Companyname:"",
            start:"",
            end:""
        }
        formik.initialValues.Career.push(newEntry)
    ActionToProsses({...ProcessedData,Career:{...newEntry}})
    }


    return(
        <div className="align-items-center container inputWidth">

        <form autoComplete="off">
        {ProcessedData.page ===0 ?
        <>
            <div className="form-group">
                <label> Name:</label>
                <input className="form-control"
                    type="text"
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name} />
                    {formik.errors.name ? <div className="text-danger">{formik.errors.name}</div> : null}
            </div>
            
            <div className="form-group">
                <label> Email:</label>
                <input className="form-control"
                    type="text"
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email} />
                {formik.errors.email ? <div className="text-danger">{formik.errors.email}</div> : null}
                <div className="form-group">
                </div>
                <label> Phone Number:</label>
                <input className="form-control"
                    type="number"
                    name="phonenumber"
                    onChange={formik.handleChange}
                    value={formik.values.phonenumber} />
                {formik.errors.phonenumber ? <div className="text-danger">{formik.errors.phonenumber}</div> : null}
            </div>
            <div className="form-group">
                <label> Date Of Birth:</label>
                <input className="form-control"
                    type="date"
                    name="dob"
                    onChange={formik.handleChange}
                    value={formik.values.dob} />
                {formik.errors.dob ? <div className="text-danger">{formik.errors.dob}</div> : null}
            </div>
            <div className="form-group">
                <label> Address</label>
                <input className="form-control"
                    type="text"
                    name="address"
                    onChange={formik.handleChange}
                    value={formik.values.address} />
                {formik.errors.address ? <div className="text-danger">{formik.errors.address}</div> : null}
            </div>
            </>:ProcessedData.page ===1 ? 
            <>
            <button className="btn btn-primary float-left" onClick={(e)=>AddEducation(e)}>add</button>
            {formik.initialValues.Education.map((value,index)=>{
               return <div key={index}>
              
             <div className="form-group">
                <label> Institute</label>
                <input className="form-control"
                    type="text"
                    name={`Education.${index}.institute`}
                    onChange={formik.handleChange}
                    value={formik.values.Education[index] ?formik.values.Education[index].institute :""}
                    />
                  {/* {formik.initialValues.errors.Education[index].institute ? <div className="text-danger">{formik.errors.Education[index].institute}</div> : null}   */}
            </div>
            <div className="form-group">
                <label> Start</label>
                <input className="form-control"
                    type="date"
                    name={`Education.${index}.start`}
                    onChange={formik.handleChange}
                    value={formik.values.Education[index] ?formik.values.Education[index].start :""}
                    />
                {/* {formik.errors.Education[index].start ? <div className="text-danger">{formik.errors.Education[index].start}</div> : null} */}
            </div>
            <div className="form-group">
                <label> End</label>
                <input className="form-control"
                    type="date"
                    name={`Education.${index}.end`}
                    onChange={formik.handleChange}
                    value={formik.values.Education[index]  ?formik.values.Education[index].end :""}
                    />
                {/* {formik.errors.Education[index].end ? <div className="text-danger">{formik.errors.Education[index].end}</div> : null} */}
            </div>
            <div className="form-group">
                <label> Degree</label>
                <input className="form-control"
                    type="text"
                    name={`Education.${index}.degree`}
                    onChange={formik.handleChange}
                    value={formik.values.Education[index]  ?formik.values.Education[index].degree :""}
                   />
             {/* {formik.errors.Education[index].degree ? <div className="text-danger">{formik.errors.Education[index].degree}</div> : null}  */}
            </div>
               </div>
            })}
            </>
            : <>
            <button className="btn btn-primary float-left" onClick={(e)=>AddCareer(e)}>add</button>
            {formik.initialValues.Career.map((value,index)=>{
               return <div key={index}>
              
             <div className="form-group">
                <label> Position</label>
                <input className="form-control"
                    type="text"
                    name={`Career.${index}.Position`}
                    onChange={formik.handleChange}
                    value={formik.values.Career[index] ? formik.values.Career[index].Position :""}
                    />
                 {/* {formik.errors.Education[index].institute ? <div className="text-danger">{formik.errors.Education[index].institute}</div> : null}  */}
            </div>
            <div className="form-group">
                <label> Start</label>
                <input className="form-control"
                    type="date"
                    name={`Career.${index}.start`}
                    onChange={formik.handleChange}
                    value={formik.values.Career[index]  ? formik.values.Career[index].start :""}
                    />
                {/* {formik.errors.Education[index].start ? <div className="text-danger">{formik.errors.Education[index].start}</div> : null} */}
            </div>
            <div className="form-group">
                <label> End</label>
                <input className="form-control"
                    type="date"
                    name={`Career.${index}.end`}
                    onChange={formik.handleChange}
                    value={formik.values.Career[index] ? formik.values.Career[index].end :""}
                    />
                {/* {formik.errors.Education[index].end ? <div className="text-danger">{formik.errors.Education[index].end}</div> : null} */}
            </div>
            <div className="form-group">
                <label> Company name</label>
                <input className="form-control"
                    type="text"
                    name={`Career.${index}.Companyname`}
                    onChange={formik.handleChange}
                    value={formik.values.Career[index]  ? formik.values.Career[index].Companyname :""}
                   />
             {/* {formik.errors.Education[index].degree ? <div className="text-danger">{formik.errors.Education[index].degree}</div> : null}  */}
            </div>
               </div>
            })}
            </>}

        </form>
        {ProcessedData.page ?<button className="btn btn-primary float-left" onClick={pageChangeDec}>Previous Page</button>:""}
        
        <button className="btn btn-primary float-right" onClick={pageChangeInc}>{ProcessedData.page== 2 ? 'Submit': 'Next Page'}</button>
    </div>
    )
}



// const mapStateToProps =state=>{
//     return {
//         responce:state
//     }
// }
const mapDispatchToProps =dispatch=>{
    return {
        saveUserDetail: (body) =>{dispatch(saveUserDetails(body))}
    }
}

export default connect(null,mapDispatchToProps)(ReactiveForm);