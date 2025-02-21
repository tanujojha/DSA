import { useEffect, useState } from "react";
import Api from '../../../Auth/Auth';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
const Kyc = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState({})
    const [loder, setLoader] = useState(false);
    const [kyc, setKyc] = useState({AppMstRegNo: '',Account_name: '',status: '0',AccountNo: '',IFSC: '',bank: '',Branch: '',PancardNo: '',PancardDoc: "",Adharno: '',adharfont: "",adharback: "",chequedoc: '',docurl: '',kyc_status: "0"});
    const [valifyAadharnumber, setValifyAadharnumber] = useState({ message: '', loader: false, validate: true });
    const [valifyPannumber, setValifyPannumber] = useState({ message: '', loader: false, validate: true });
    const [DocPreview, setDocPreview] = useState({ 'adharfont': '', 'adharback': '', 'PancardDoc ': '', 'chequedoc': '' });
    const Toastor = (message) => {
        toast(message, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    // Get Profile Details
    const fetchProfile = async()=> {
        // setIsLoading(true)
        try {
            const res = await Api.get("/User/Getprofile_details");

            console.log(res);
            

            if (res.status === 200 && parseInt(res.data.Status) === 1) {
                setUserData(res.data.Payload);
            }

        } catch (error) {
            console.log(error);
            
        }finally{
            // setIsLoading(false)
        }
    }


    const Getkyc = () => {
        Api.get('/User/GetKyc_details').then(res => {
            if (res.status === 200 && parseInt(res.data.Status) === 1) {
                setKyc(res.data.Payload);
            }
        }).catch(err => console.log(err));
    }
    const ChooseFile = (event) => {
        if (event.currentTarget.files[0]) {
            const reader = new FileReader();
            const key = event.currentTarget.name;
            setDocPreview({ ...DocPreview, [event.currentTarget.name]: URL.createObjectURL(event.currentTarget.files[0]) });
            reader.onload = (e) => {
                compressImage(e.target.result, (compressedDataUrl) => {
                    setKyc({ ...kyc, [key]: compressedDataUrl.split(",")[1] });
                });
            };
            reader.readAsDataURL(event.currentTarget.files[0]);
            function compressImage(dataUrl, callback) {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0, img.width, img.height);
                    const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.5);
                    callback(compressedDataUrl);
                };
                img.src = dataUrl;
            }
        }else{
            setDocPreview({ ...DocPreview, [event.currentTarget.name]: '' });
        }
    }
    const CheckAadharNumber = (e) => {
        e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '');
        e.currentTarget.value = e.currentTarget.value.slice(0, 12);
        setKyc({ ...kyc, [e.currentTarget.name]: e.currentTarget.value });
        setValifyAadharnumber({ message: '',loader: true, validate: false })
        if (e.currentTarget.value.length < 12) { setValifyAadharnumber({ message: 'Please Enter 12 Digit Aadhar Number...!!', validate: false }); return }
        if(e.currentTarget.value.length===12){
            Api.get('/SignUp/CheckAdhar_kyc?adharno='+e.currentTarget.value+'&userid='+userData.Regno).then((res)=>{
                if(res.status === 200 && parseInt(res.data.Status)===1){
                    setValifyAadharnumber({ message: '',loader: false, validate: true });
                }else{
                    setValifyAadharnumber({ message: res.data.Payload,loader: false, validate: false });
                }
            }).catch((error)=>{
                setValifyAadharnumber({ message: 'Somthing went worng...!!',loader: false, validate: false });
                console.log(error);
            })
        }
    }
    const CheckPanNumber = (e) => {
        e.currentTarget.value = e.currentTarget.value.replace(/[^0-9a-zA-Z]/g, '');
        e.currentTarget.value = e.currentTarget.value.slice(0, 10);
        e.currentTarget.value = e.currentTarget.value.toUpperCase();
        setValifyPannumber({ message: '', loader: true, validate: false });
        setKyc({ ...kyc, [e.currentTarget.name]: e.currentTarget.value });
        if (/([A-Z]){5}([0-9]){4}([A-Z]){1}$/.test(e.currentTarget.value)) { 
            Api.get('/SignUp/CheckPannokyc?panno='+e.currentTarget.value+'&userid='+userData.Regno).then((res)=>{
                if(res.status === 200 && parseInt(res.data.Status)===1){
                    setValifyPannumber({ message: '',loader: false, validate: true }); 
                }else{
                    setValifyPannumber({ message: res.data.Payload,loader: false, validate: false });  
                }
            }).catch((error)=>{
                setValifyAadharnumber({ message: 'Somthing went worng...!!',loader: false, validate: false });
                console.log(error);
            })
        }else{
            setValifyPannumber({ message: 'Invalid pan number',loader: false, validate: false });  
        }
    }
    const changeValue = (e) => setKyc({ ...kyc, [e.currentTarget.name]: e.currentTarget.value });
    const updateKyc = (e) => {
        e.preventDefault();
        if(kyc.Adharno.length!==12){
             setValifyAadharnumber({ message: 'Please Enter Valid Aadhar Number', validate: false })
        }else if (!/([A-Z]){5}([0-9]){4}([A-Z]){1}$/.test(kyc.PancardNo)){
            setValifyPannumber({ message: 'Please Enter Invalid Pan Number', validate: false });
        }else{
            setLoader(true);
            Api.post('/User/Update_Kyc',{
                Account_name: kyc.Account_name,
                AccountNo: kyc.AccountNo,
                IFSC: kyc.IFSC,
                bank: kyc.bank,
                Branch: kyc.Branch,
                PancardNo: kyc.PancardNo,
                panodocname: kyc.panodocname,
                Adharno: kyc.Adharno,
                PancardDoc: kyc.PancardDoc,
                adharfont: kyc.adharfont,
                adharback: kyc.adharback,
                chequedoc: kyc.chequedoc,
            }).then((succ) => {
                if (succ.status === 200 && parseInt(succ.data.Status) === 1) {
                    setLoader(false);
                    Getkyc();
                    Toastor('Kyc successfully update');
                } else {
                    setLoader(false);
                    Toastor('Something went wrong');
                }
            }).catch((err) => {
                Toastor('try again');
                console.log(err);
            })
        }
    }
    useEffect(() => {
        window.scrollTo(0, 0);
        Getkyc();
        
    }, []);

    useEffect(()=> {
        fetchProfile();
    }, [])
    const placeholder = (e) => { return <sapn class="card-text placeholder-glow"><span class={`placeholder col-${e}`}></span></sapn> }
    return (<>
        <div class="content-page">
            <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box">
                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item">Your kyc</li>
                                    </ol>
                                </div>
                                <h4 className="page-title">Profile</h4>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-body profile-user-box bg-profile">
                                    <div className="row">
                                        <div className="col-sm-8">
                                            <div className="row align-items-center">
                                                <div className="col-auto">
                                                    <div className="avatar-lg">
                                                        <img src='/img/image/emptyProfile.png' alt="" className="rounded-circle img-thumbnail" />
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div>
                                                        <h4 className="mt-1 mb-0 text-white">{kyc.Account_name ? kyc.Account_name : placeholder(6)}</h4>
                                                        <p className="font-13 text-white-50">{kyc.AppMstRegNo ? kyc.AppMstRegNo : placeholder(4)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-4">
                                            <div class="text-center mt-sm-0 mt-3 text-sm-end">
                                                <Link to="/user/account"><button type="button" class="btn btn-light"> <i class="mdi mdi-account-edit me-1"></i> Account</button></Link>
                                            </div>
                                        
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="header-title my-0">KYC</h4>
                                    <hr />
                                    <div className="text-start">
                                        <form onSubmit={updateKyc}>
                                            <h5 className="text-uppercase"><i className="mdi mdi-account-circle me-1"></i> </h5>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="mb-3">
                                                        <label for="name" className="form-label mb-0">Name<code>*</code></label>
                                                        <input onChange={changeValue} type="text" name="Account_name" className="form-control" id="name" value={kyc.Account_name ? kyc.Account_name : ""}  placeholder="Name" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="mb-3">
                                                        <label for="pan" className="form-label mb-0">Pan Number<code>*</code></label>
                                                        <input type="pan" name="PancardNo" className="form-control" id="pan" value={kyc.PancardNo ? kyc.PancardNo : ""}  onChange={CheckPanNumber} placeholder="Pan Number" disabled={parseInt(kyc.kyc_status)?true:false} required />
                                                        {valifyPannumber.loader ? <span><div class="spinner-border" role="status" style={{ width: '12px', height: '12px' }}></div> Please Wait...</span> : valifyPannumber.message ? <span className='text-danger'>{valifyPannumber.message}</span> : ""}
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="mb-3">
                                                        <label for="aadhar" className="form-label mb-0">Aadhar Number<code>*</code></label>
                                                        <input type="text" name="Adharno" className="form-control" id="aadhar" value={kyc.Adharno ? kyc.Adharno : ""} onChange={CheckAadharNumber}  placeholder="Aadhar Number" disabled={parseInt(kyc.kyc_status)?true:false} required />
                                                        {valifyAadharnumber.loader ? <span><div class="spinner-border" role="status" style={{ width: '12px', height: '12px' }}></div> Please Wait...</span> : valifyAadharnumber.message ? <span className='text-danger'>{valifyAadharnumber.message}</span> : ""}
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="mb-3">
                                                        <label for="account" className="form-label mb-0">Account No<code>*</code></label>
                                                        <input type="text" name="AccountNo" className="form-control" id="account" value={kyc.AccountNo ? kyc.AccountNo : ""} onChange={changeValue}  placeholder="Account Number" disabled={parseInt(kyc.kyc_status)?true:false} required />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="mb-3">
                                                        <label for="bank" className="form-label mb-0">Bank Name<code>*</code></label>
                                                        <input type="text" name="bank" className="form-control" id="bank" value={kyc.bank ? kyc.bank : ""}  onChange={changeValue} placeholder="Bank Name" disabled={parseInt(kyc.kyc_status)?true:false} required />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="mb-3">
                                                        <label for="branch" className="form-label mb-0">Branch<code>*</code></label>
                                                        <input type="text" name="Branch" className="form-control" id="branch" value={kyc.Branch ? kyc.Branch : ""} onChange={changeValue}  placeholder="Branch Name" disabled={parseInt(kyc.kyc_status)?true:false} required />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="mb-3">
                                                        <label for="ifsc" className="form-label mb-0">IFSC Code<code>*</code></label>
                                                        <input type="text" name="IFSC" className="form-control" id="ifsc" value={kyc.IFSC ? kyc.IFSC : ""} onChange={changeValue}  placeholder="IFSC Code" disabled={parseInt(kyc.kyc_status)?true:false} required />
                                                    </div>
                                                </div>
                                                <div className="col-md-12 mt-3">
                                                    <div className="row">
                                                    <div className='col-md-3'>
                                                            <div className='document'>
                                                                <label htmlFor="ArontAadhar">
                                                                    <img src={kyc?.adharfont.split(".").length==2?kyc?.docurl+kyc?.adharfont:DocPreview.adharfont?DocPreview.adharfont:"/img/front.png"} class="img-fluid" style={{ height: '123px' }} />
                                                                    <input type="file" name="adharfont" id="ArontAadhar" accept='image/*' onChange={ChooseFile} disabled={parseInt(kyc.kyc_status)?true:false} hidden />
                                                                    <p class="img-text text-center text-muted">Aadhar Front</p>
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className='col-md-3'>
                                                            <div className='document'>
                                                                <label htmlFor="Backaadhar">
                                                                <img src={kyc?.adharback.split(".").length==2?kyc.docurl+kyc?.adharback:DocPreview.adharback?DocPreview.adharback:"/img/back.png"} class="img-fluid" style={{ height: '123px' }} />
                                                                    <input type="file" name="adharback" id="Backaadhar" accept='image/*' onChange={ChooseFile} disabled={parseInt(kyc.kyc_status)?true:false} hidden />
                                                                    <p class="img-text text-center text-muted">Aadhar Back</p>
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className='col-md-3'>
                                                            <div className='document'>
                                                                <label htmlFor="Pancard">
                                                                <img src={kyc?.PancardDoc.split(".").length==2?kyc.docurl+kyc?.PancardDoc:DocPreview.PancardDoc ?DocPreview.PancardDoc :"/img/pan.png"} class="img-fluid" style={{ height: '123px' }} />
                                                                    <input type="file" name="PancardDoc" id="Pancard" accept='image/*' onChange={ChooseFile} disabled={parseInt(kyc.kyc_status)?true:false} hidden />
                                                                    <p class="img-text text-center text-muted">PAN Card</p>
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className='col-md-3'>
                                                            <div className='document'>
                                                                <label htmlFor="Checkbook">
                                                                <img src={kyc?.chequedoc.split(".").length==2?kyc.docurl+kyc?.chequedoc:DocPreview.chequedoc?DocPreview.chequedoc:"/img/check.png"} class="img-fluid" style={{ height: '123px' }} />
                                                                    <input type="file" name="chequedoc" id="Checkbook" accept='image/*' onChange={ChooseFile} disabled={parseInt(kyc.kyc_status)?true:false} hidden />
                                                                    <p class="img-text text-center text-muted">Cancelled Cheque</p>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {
                                                parseInt(kyc.kyc_status)?
                                                <h2 className="text-center py-5">Your KYC Completed.</h2>
                                                :
                                                <div className="text-end">  { loder ? <button class="btn btn-success" type="button" disabled><span class="spinner-border spinner-border-sm" aria-hidden="true"></span> <span class="visually-show" role="status">Please Wait...</span></button> : <button type="submit" className="btn btn-success mt-2"><i class="bi bi-file-earmark"></i> UPDATE KYC</button> } </div>
                                            }
                                            
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </>)
}
export default Kyc;