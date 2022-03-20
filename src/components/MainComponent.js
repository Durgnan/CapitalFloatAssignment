import React, {useState} from 'react';
import { AddCircle, Edit, Delete, Search, Sort, SortByAlpha } from '@mui/icons-material';
// import { Modal } from '@mui/material'
import {Form, InputGroup} from 'react-bootstrap'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const dummyData = [
    {
        paymentId : 435456,
        orderDate : "05/11/2015",
        merchatId : 3245,
        customerEmail : "varun@gmail.com",
        amount : 234.56,
        paymentStatus : 'Initiated'
    },
    {
        paymentId : 435466,
        orderDate : "06/21/2015",
        merchatId : 3289,
        customerEmail : "rahul@gmail.com",
        amount : 122.66,
        paymentStatus : 'Failed'
    },
    {
        paymentId : 435459,
        orderDate : "02/23/2015",
        merchatId : 4567,
        customerEmail : "alok@gmail.com",
        amount : 4567.33,
        paymentStatus : 'Initiated'
    },
    {
        paymentId : 435476,
        orderDate : "04/06/2015",
        merchatId : 3245,
        customerEmail : "rohit@gmail.com",
        amount : 23345,
        paymentStatus : 'Success'
    },
    {
        paymentId : 112345,
        orderDate : "08/24/2015",
        merchatId : 3245,
        customerEmail : "sapna@gmail.com",
        amount : 567.96,
        paymentStatus : 'Refunded'
    },
    {
        paymentId : 345654,
        orderDate : "05/11/2015",
        merchatId : 3245,
        customerEmail : "kamal@gmail.com",
        amount : 2434.43,
        paymentStatus : 'Initiated'
    },
    {
        paymentId : 435451,
        orderDate : "03/10/2015",
        merchatId : 3245,
        customerEmail : "shrey@gmail.com",
        amount : 729.56,
        paymentStatus : 'Dropped'
    },
    {
        paymentId : 435486,
        orderDate : "03/16/2015",
        merchatId : 3245,
        customerEmail : "amar@gmail.com",
        amount : 3947.57,
        paymentStatus : 'Initiated'
    },
    {
        paymentId : 435493,
        orderDate : "03/18/2015",
        merchatId : 3245,
        customerEmail : "amar123@gmail.com",
        amount : 497.57,
        paymentStatus : 'Initiated'
    },
    {
        paymentId : 435593,
        orderDate : "06/18/2015",
        merchatId : 3245,
        customerEmail : "sudipt@gmail.com",
        amount : 2999,
        paymentStatus : 'Initiated'
    },
    {
        paymentId : 436493,
        orderDate : "07/18/2015",
        merchatId : 3245,
        customerEmail : "kriti@gmail.com",
        amount : 5000,
        paymentStatus : 'Dropped'
    },
    {
        paymentId : 536493,
        orderDate : "07/24/2015",
        merchatId : 3245,
        customerEmail : "varund@gmail.com",
        amount : 3897.44,
        paymentStatus : 'Dropped'
    },
    {
        paymentId : 436423,
        orderDate : "02/18/2015",
        merchatId : 3245,
        customerEmail : "srk@gmail.com",
        amount : 5037.45,
        paymentStatus : 'Dropped'
    },
    {
        paymentId : 436893,
        orderDate : "07/25/2015",
        merchatId : 3245,
        customerEmail : "gaurav123@gmail.com",
        amount : 5670,
        paymentStatus : 'Dropped'
    },
    {
        paymentId : 345678,
        orderDate : "03/14/2015",
        merchatId : 3245,
        customerEmail : "bhas12er@gmail.com",
        amount : 32435.5,
        paymentStatus : 'Success'
    }
]
let tableData = localStorage.getItem('tableData') == null ? localStorage.setItem('tableData',JSON.stringify(dummyData)) : JSON.parse(localStorage.getItem('tableData'))

const MainComponent = (props) => 
{

    const [data,setData] = useState(tableData)
    const [searchValue,setSearchValue] = useState('')
    const [sortField, setSortField] = useState('paymentId')
    const [sortOrder, setSortOrder] = useState('asc')
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(5)


    const [open,setOpen] = useState(false)
    const [updateOpen,setUpdateOpen] = useState(false)

    const [modalPaymentId, setModalPaymentId] = useState(0)
    const [modalOrderDate, setModalOrderDate] = useState("")
    const [modalMerchantId, setModalMerchantId] = useState(0)
    const [modalCustomerEmail, setModalCustomerEmail] = useState("")
    const [modalAmount, setModalAmount] = useState(0)
    const [modalPaymentStatus, setModalPaymentStatus] = useState("Initiated")
    
    const [touched,setTouched] = useState({
        paymentId : false,
        orderDate : false,
        merchantId : false,
        customerEmail : false,
        amount : false,

    })

    const [errors,updateErrors] = useState({
        paymentId : false,
        orderDate : false,
        merchantId : false,
        customerEmail : false,
        amount : false,
    })

    const onChangeModalData = (type, value) => 
    {   
        switch(type)
        {
            case 'paymentId' :
                updateErrors({...errors, paymentId: +value < 0 || isNaN(+value)}) 
                setModalPaymentId(+value)
                break
            case 'orderDate' :
                setModalOrderDate(value)               
                break
            case 'merchantId' :
                updateErrors({...errors, merchantId: +value < 0 || isNaN(+value)}) 
                setModalMerchantId(+value)               
                break
            case 'customerEmail' :
                updateErrors({...errors, customerEmail: !value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)}) 
                setModalCustomerEmail(value)               
                break
            case 'amount' :
                updateErrors({...errors, amount: +value < 0 || isNaN(+value)}) 
                setModalAmount(+value)               
                break
            case 'paymentStatus' :
                setModalPaymentStatus(value)               
                break
            default: break;
        }
    }

    const handleOpen = () => {setOpen(true)}
    const handleUpdateOpen = (paymentId, orderDate, merchatId, customerEmail, amount, paymentStatus) => {
        setModalPaymentId(paymentId)
        setModalOrderDate(orderDate)
        setModalMerchantId(merchatId)
        setModalCustomerEmail(customerEmail)
        setModalAmount(amount)
        setModalPaymentStatus(paymentStatus)
        setUpdateOpen(true)
    }
    
    const toggle = () => {
        if(open === true)
            clearForm()
        setOpen(!open)
    }

    const toggleUpdate = () => {
        if(updateOpen === true)
            clearForm()
        setUpdateOpen(!updateOpen)
    }

    const updateLocalStorage = (d = undefined) => 
    {
        localStorage.setItem('tableData',JSON.stringify(d))
    }

    const handleSubmit = () => 
    {
        const newRecords = [{
            paymentId: modalPaymentId,
            orderDate: modalOrderDate,
            merchatId: modalMerchantId,
            customerEmail: modalCustomerEmail,
            amount: modalAmount,
            paymentStatus: modalPaymentStatus
        },...data]
        setData(newRecords)
        updateLocalStorage(newRecords)
        toggle()

    }

    const handleUpdate = () =>
    {
        const formData = {
            paymentId : modalPaymentId,
            orderDate : modalOrderDate,
            merchatId : modalMerchantId,
            customerEmail : modalCustomerEmail,
            amount : modalAmount,
            paymentStatus: modalPaymentStatus
        }
        const newData = data.map((item) => {
            if(item.paymentId === formData.paymentId)
                return formData
            else
                return item
        })
        setData([...newData])
        updateLocalStorage([...newData])
        toggleUpdate()
    }


    const handleDelete = (paymentId) => 
    {
        const newData = data.filter((item) => item.paymentId !== paymentId)
        setData(newData)
        updateLocalStorage(newData)
    }

    const clearForm = () => 
    {
        setModalPaymentId(0)
        setModalOrderDate("")
        setModalMerchantId(0)
        setModalCustomerEmail("")
        setModalAmount(0)
        setModalPaymentStatus("Initiated")
        setTouched({
            paymentId : false,
            orderDate : false,
            merchantId : false,
            customerEmail : false,
            amount : false,
    
        })
    
        updateErrors({
            paymentId : false,
            orderDate : false,
            merchantId : false,
            customerEmail : false,
            amount : false,
        })

    }

    const updateSearchData = (value) => 
    {
        setSearchValue(value)
    }

    const tableSorter = (previousItem,currentItem) => 
    {
        let value = 0;
        switch(sortField)
        {
            case 'paymentId': 
                if (previousItem.paymentId === currentItem.paymentId)
                    value = 0
                else if(previousItem.paymentId > currentItem.paymentId)
                    value = sortOrder === 'desc' ? -1 : 1
                else
                    value = sortOrder === 'desc' ? 1 : -1
                break;
            case 'orderDate': 
                let pDate = new Date(previousItem.orderDate)
                let cDate = new Date(currentItem.orderDate)
                if (pDate === cDate)
                    value = 0
                else if(pDate > cDate)
                    value = sortOrder === 'desc' ? -1 : 1
                else
                    value = sortOrder === 'desc' ? 1 : -1
                break;
            case 'merchatId': 
                if (previousItem.merchatId === currentItem.merchatId)
                    value = 0
                else if(previousItem.merchatId > currentItem.merchatId)
                    value = sortOrder === 'desc' ? -1 : 1
                else
                    value = sortOrder === 'desc' ? 1 : -1
                break;
            case 'customerEmail':
                let pCustomerEmail = previousItem.customerEmail.toLowerCase()
                let cCustomerEmail = currentItem.customerEmail.toLowerCase()
                if (pCustomerEmail === cCustomerEmail)
                    value = 0
                else if(pCustomerEmail > cCustomerEmail)
                    value = sortOrder === 'desc' ? -1 : 1
                else
                    value = sortOrder === 'desc' ? 1 : -1
                break;
            case 'amount': 
                if (previousItem.amount === currentItem.amount)
                    value = 0
                else if(previousItem.amount > currentItem.amount)
                    value = sortOrder === 'desc' ? -1 : 1
                else
                    value = sortOrder === 'desc' ? 1 : -1
                break;
            case 'paymentStatus':
                let previousePaymentStatus = previousItem.paymentStatus.toLowerCase()
                let currentPaymentStatus = currentItem.paymentStatus.toLowerCase()
                if (previousePaymentStatus === currentPaymentStatus)
                    value = 0
                else if(previousePaymentStatus > currentPaymentStatus)
                    value = sortOrder === 'desc' ? -1 : 1
                else
                    value = sortOrder === 'desc' ? 1 : -1
                break;
            default: 
                if (previousItem === currentItem)
                    value = 0
                else if(previousItem > currentItem)
                    value = sortOrder === 'desc' ? -1 : 1
                else
                    value = sortOrder === 'desc' ? 1 : -1
                break;
        }
        return value
    }

    const tableFilter = (i) => 
    {
        let searchString = searchValue.toLowerCase()
        const {paymentId, orderDate, merchatId, customerEmail, amount, paymentStatus} = i
        return  String(paymentId).toLowerCase().includes(searchString) || 
                new Date(orderDate).toLocaleDateString('en-US').includes(searchString) || 
                String(merchatId).toLowerCase().includes(searchString) || 
                customerEmail.toLowerCase().includes(searchString) || 
                String(amount).toLowerCase().includes(searchString) || 
                paymentStatus.toLowerCase().includes(searchString)
    }

    const indexOfLastRow = currentPage * postsPerPage;
    const indexOfFirstRow = indexOfLastRow - postsPerPage;
    // const currentRows = data.slice(indexOfFirstRow,indexOfLastRow)



    return (
        <div className='container'>
            {/* <div className='text-center display-6'>Hi</div> */}
            <Modal 
                isOpen={open}
                toggle={toggle}
                centered
            >
                <ModalHeader toggle={toggle}>
                    Add New Transaction
                </ModalHeader>
                <ModalBody>
                    <Form className='bg-white ml-3 mr-3'>
                        <Form.Group className="mb-3" controlId="formPaymentId">
                            <Form.Label>Payment ID</Form.Label>
                            <Form.Control 
                                type="number" 
                                value={modalPaymentId} 
                                onChange={(event) => {onChangeModalData("paymentId",event.target.value)}} 
                                onClick={() => {
                                    if(touched.paymentId === false) 
                                    {
                                        setTouched({...touched, paymentId:true})
                                    }
                                }}
                                placeholder="Enter Payment ID" 
                                isInvalid={touched.paymentId && errors.paymentId}
                                />
                            <Form.Control.Feedback type="invalid">Please enter a valid Payment ID</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formOrderDate">
                            <Form.Label>Order Date</Form.Label>
                            <Form.Control 
                                type='date' 
                                value={modalOrderDate} 
                                onChange={(event) => {onChangeModalData("orderDate",event.target.value)}} 
                                onClick={() => {
                                    if(touched.orderDate === false) 
                                    {
                                        setTouched({...touched, orderDate:true})
                                    }
                                }}
                                placeholder="Enter Order Date" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formMerchantId">
                            <Form.Label>Merchant ID</Form.Label>
                            <Form.Control 
                                type="number" 
                                value={modalMerchantId} 
                                onChange={(event) => {onChangeModalData("merchantId",event.target.value)}} 
                                onClick={() => {
                                    if(touched.merchantId === false) 
                                    {
                                        setTouched({...touched, merchantId:true})
                                    }
                                }}
                                placeholder="Enter Merchant ID"
                                isInvalid={touched.merchantId && errors.merchantId}
                                />
                            <Form.Control.Feedback type="invalid">Please enter a valid Merchant ID</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formCustomerEmail">
                            <Form.Label>Customer Email address</Form.Label>
                            <Form.Control 
                                type="email" 
                                value={modalCustomerEmail} 
                                onChange={(event) => {onChangeModalData("customerEmail",event.target.value)}} 
                                onClick={() => {
                                    if(touched.customerEmail === false) 
                                    {
                                        setTouched({...touched, customerEmail:true})
                                    }
                                }}
                                placeholder="Enter Customer Email"
                                isInvalid={touched.customerEmail && errors.customerEmail}
                                />
                            <Form.Control.Feedback type="invalid">Please enter a valid Customer Email</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formAmount">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control 
                                type="number" 
                                value={modalAmount} 
                                onChange={(event) => {onChangeModalData("amount",event.target.value)}} 
                                onClick={() => {
                                    if(touched.amount === false) 
                                    {
                                        setTouched({...touched, amount:true})
                                    }
                                }}
                                placeholder="Enter Amount"
                                isInvalid={touched.amount && errors.amount}
                                />
                            <Form.Control.Feedback type="invalid">Please enter a valid Amount</Form.Control.Feedback>
                        </Form.Group>
                    
                        <Form.Group className="mb-3" controlId="formPaymentStatus">
                            <Form.Label>Payment Status</Form.Label>
                            <Form.Select onChange={(event) => {onChangeModalData("paymentStatus",event.target.value)}} >
                                <option value={'Initiated'}>Initiated</option>
                                <option value={'Failed'}>Failed</option>
                                <option value={'Dropped'}>Dropped</option>
                                <option value={'Success'}>Success</option>
                                <option value={'Refunded'}>Refunded</option>
                            </Form.Select>
                        </Form.Group>
                        
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={()=>{handleSubmit()}}>
                        Add New Transaction
                    </Button>
                </ModalFooter>
                
            </Modal>
            <Modal 
                isOpen={updateOpen}
                toggle={toggleUpdate}
                centered
            >
                <ModalHeader toggle={toggleUpdate}>
                    Update Transaction
                </ModalHeader>
                <ModalBody>
                    <Form className='bg-white ml-3 mr-3'>
                        <Form.Group className="mb-3" controlId="formPaymentId">
                            <Form.Label>Payment ID</Form.Label>
                            <Form.Control 
                                type="number" 
                                value={modalPaymentId} 
                                disabled
                                placeholder="Enter Payment ID"
                                isInvalid={touched.paymentId && errors.paymentId}
                                />
                            <Form.Control.Feedback type="invalid">Please enter a valid Payment ID</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formOrderDate">
                            <Form.Label>Order Date</Form.Label>
                            <Form.Control 
                                type='date' 
                                value={modalOrderDate} 
                                onChange={(event) => {onChangeModalData("orderDate",event.target.value)}} 
                                onClick={() => {
                                    if(touched.orderDate === false) 
                                    {
                                        setTouched({...touched, orderDate:true})
                                    }
                                }}
                                placeholder="Enter Order Date" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formMerchantId">
                            <Form.Label>Merchant ID</Form.Label>
                            <Form.Control 
                                type="number" 
                                value={modalMerchantId} 
                                onChange={(event) => {onChangeModalData("merchantId",event.target.value)}} 
                                onClick={() => {
                                    if(touched.merchantId === false) 
                                    {
                                        setTouched({...touched, merchantId:true})
                                    }
                                }}
                                placeholder="Enter Merchant ID"
                                isInvalid={touched.merchantId && errors.merchantId}
                                />
                            <Form.Control.Feedback type="invalid">Please enter a valid Merchant ID</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formCustomerEmail">
                            <Form.Label>Customer Email address</Form.Label>
                            <Form.Control 
                                type="email" 
                                value={modalCustomerEmail} 
                                onChange={(event) => {onChangeModalData("customerEmail",event.target.value)}} 
                                onClick={() => {
                                    if(touched.customerEmail === false) 
                                    {
                                        setTouched({...touched, customerEmail:true})
                                    }
                                }}
                                placeholder="Enter Customer Email"
                                isInvalid={touched.customerEmail && errors.customerEmail}
                                />
                            <Form.Control.Feedback type="invalid">Please enter a valid Customer Email</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formAmount">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control 
                                type="number" 
                                value={modalAmount} 
                                onChange={(event) => {onChangeModalData("amount",event.target.value)}} 
                                onClick={() => {
                                    if(touched.amount === false) 
                                    {
                                        setTouched({...touched, amount:true})
                                    }
                                }}
                                placeholder="Enter Amount"
                                isInvalid={touched.amount && errors.amount}
                                />
                            <Form.Control.Feedback type="invalid">Please enter a valid Amount</Form.Control.Feedback>
                        </Form.Group>
                    
                        <Form.Group className="mb-3" controlId="formPaymentStatus">
                            <Form.Label>Payment Status</Form.Label>
                            <Form.Select onChange={(event) => {onChangeModalData("paymentStatus",event.target.value)}} >
                                <option value={'Initiated'}>Initiated</option>
                                <option value={'Failed'}>Failed</option>
                                <option value={'Dropped'}>Dropped</option>
                                <option value={'Success'}>Success</option>
                                <option value={'Refunded'}>Refunded</option>
                            </Form.Select>
                        </Form.Group>
                        
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={()=>{handleUpdate()}}>
                        Update Transaction
                    </Button>
                </ModalFooter>
                
            </Modal>
            <div className='row mt-2 mb-2'>
                <div className='col-3'>
                    <InputGroup >
                        <InputGroup.Text ><Search /></InputGroup.Text>
                        <Form.Control  type='search' value={searchValue} onChange={(e) => {updateSearchData(e.target.value)}} placeholder="Enter Search Value..."/>
                    </InputGroup>
                </div>
                <div className='col-2'>
                    <InputGroup>
                        <InputGroup.Text ><Sort /></InputGroup.Text>
                        <Form.Select onChange={(event) => {setSortField(event.target.value)}} >
                            <option value={'paymentId'}>Payment ID</option>
                            <option value={'orderDate'}>Order Date</option>
                            <option value={'merchatId'}>Merchant ID</option>
                            <option value={'customerEmail'}>Customer Email</option>
                            <option value={'amount'}>Amount</option>
                            <option value={'paymentStatus'}>Payment Status</option>
                        </Form.Select>
                    </InputGroup>
                </div>
                <div className='col-2'>
                    <InputGroup>
                        <InputGroup.Text ><SortByAlpha /></InputGroup.Text>
                        <Form.Select onChange={(event) => {setSortOrder(event.target.value)}} >
                            <option value={'asc'}>Ascending</option>
                            <option value={'desc'}>Descending</option>
                        </Form.Select>
                    </InputGroup>
                </div>
                <div className='col-4'></div>
                <span className='col-1 btn btn-dark' onClick={() => {handleOpen()}}><AddCircle /></span>
            </div>
            
            <div className="row border border-dark bg-dark" id="heading">
                <div className="col border border-dark text-white">Payment ID</div>
                <div className="col border border-dark text-white">Order Date</div>
                <div className="col border border-dark text-white">Merchant ID</div>
                <div className="col border border-dark text-white">Customer Email</div>
                <div className="col border border-dark text-white">Amount</div>
                <div className="col border border-dark text-white">Payment Status</div>
                <div className="col border border-dark text-white">Actions</div>
            </div>
            {
                data
                .filter(tableFilter)
                .sort(tableSorter)
                .slice(indexOfFirstRow,indexOfLastRow)
                .map((item, index) => {
                    const {paymentId, orderDate, merchatId, customerEmail, amount, paymentStatus} = item
                    return(
                        <div className="row border border-dark" key={index}>
                            <div className="col border border-dark">{paymentId}</div>
                            <div className="col border border-dark">{new Date(orderDate).toLocaleDateString('en-US')}</div>
                            <div className="col border border-dark">{merchatId}</div>
                            <div className="col border border-dark">{customerEmail}</div>
                            <div className="col border border-dark">{amount}</div>
                            <div className="col border border-dark">{paymentStatus}</div>
                            <div className="col border border-dark">
                                <Edit onClick={() => {handleUpdateOpen(paymentId, orderDate, merchatId, customerEmail, amount, paymentStatus)}}/>
                                <Delete onClick={() => {handleDelete(paymentId)}}/>
                            </div>
                        </div>
                    )
                })
            }
            <div className='row mt-3'>
                <div className='col-3'>
                    <InputGroup>
                        <InputGroup.Text >Rows per page</InputGroup.Text>
                        <Form.Select value={postsPerPage}  onChange={(event) => {setPostsPerPage(event.target.value)}} >
                            <option key={1} value={1}>1</option>
                            <option key={5} value={5}>5</option>
                            <option key={10} value={10}>10</option>
                            <option key={15} value={15}>15</option>
                            <option key={20} value={20}>20</option>
                            <option key={25} value={25}>25</option>
                            <option key={50} value={50}>50</option>
                        </Form.Select>
                    </InputGroup>
                </div>
                <div className='col-3'>
                    <InputGroup>
                        <InputGroup.Text >Page</InputGroup.Text>
                        <Form.Select value={currentPage}  onChange={(event) => {setCurrentPage(event.target.value)}} >
                            { 
                                Array.from({length: Math.ceil(data.length/postsPerPage)}, (_, i) => i + 1).map((item) => {
                                    return <option key={item} value={item}>{item}</option>
                                })
                            }
                        </Form.Select>
                    </InputGroup>
                </div>
                <div className='col-1'>
                    <Button color="secondary" onClick={(event) => { setCurrentPage(currentPage-1) }} disabled={currentPage === 1}>Previous</Button>
                </div>
                <div className='col-1'>
                    <Button color="secondary" onClick={(event) => { setCurrentPage(currentPage+1) } } disabled={currentPage === Math.ceil(data.length/postsPerPage)}>Next</Button>
                </div>
            </div>
        </div>
        
    )
}

export default MainComponent;