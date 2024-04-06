import React, { useState, useEffect } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import { allAdminBranches, clearErrors } from 'actions/storebranchActions';
import { useDispatch, useSelector } from 'react-redux';
const DropdownComponent = () => {
    const dispatch = useDispatch();
    const { storeBranch, loading, error } = useSelector((state) => state.allStoreBranch);
    const { user } = useSelector((state) => state.auth);
    const [branch, setBranch] = useState("");
    useEffect(() => {
        dispatch(allAdminBranches(user._id));
        if (error) {

            dispatch(clearErrors())
        }
    }, [dispatch, error]);
    useEffect(()=>{
        console.log("Store branch: ",storeBranch)
    },[storeBranch])
    return (
        <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                {branch ? branch : "Select Branch"}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {storeBranch && storeBranch.map((branch) => (<Dropdown.Item href="#/action-1" onClick={()=>setBranch(branch.branch)}>{branch.branch}</Dropdown.Item>))}

            </Dropdown.Menu>
        </Dropdown>
    )
}

export default DropdownComponent