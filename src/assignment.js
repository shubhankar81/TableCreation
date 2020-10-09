import React from 'react';

var data = require("./data.json");

class TableExample extends React.Component {
   constructor(props){
        super()
        this.state = {
            user_data : data,
            searched_data : data,
            all_flag : false,
            allChecked : false
        }
   }

   // events handle  checked all checkboxes
   checkedAll = () => {
    let {user_data, allChecked, all_flag } = this.state;
    user_data.map(_result => {
        return _result.is_checked = allChecked ? false : true
    })
    allChecked = !allChecked;
    all_flag = !all_flag
    this.setState({
        user_data,
        allChecked,
        all_flag
    })   
   }
   // events for single checkboxes
   checkedChange = (_id) =>{
    let {user_data, all_flag, allChecked} = this.state;
    user_data.map(_result => {
        return _result.is_checked = _result.ID === _id ? !_result.is_checked : _result.is_checked
    })
    let i=0;
    user_data.map(_d=> { 
       return i = _d.is_checked ? ++i : i
    })
    allChecked = i === user_data.length ? true : false;
    all_flag = i > 0 ? true : false
    this.setState({
        user_data,
        allChecked,
        all_flag
    })
   }
   // events for handling input boxes for price
   editFlag = (_id) => {
    let {user_data} = this.state;
    user_data.map(_result => {
        return _result.is_edit = _result.ID === _id ? !_result.is_edit : false
    })
    this.setState({
        user_data
    })
   }
   // update value for price given in input
   updateValue = (event, _id) => {
    let {user_data} = this.state;
    user_data.map(_result => {
        if(_result.ID === _id){
            _result.price = event.target.value
            _result.editFlag = false
        }
    })
    this.setState({
        user_data
    })
   }
   // handle delete event on button
   handleDelete = () => {
    let { user_data } = this.state;
    let _userfilter = user_data.filter(_detail => !_detail.is_checked)
    this.setState({
        user_data : _userfilter,
        searched_data : _userfilter
    })
   }
   // handle reset button event for 
   handleReset = () => {
       let { user_data, allChecked } = this.state;
       user_data.map(_details=> {
         return  _details.is_checked = false;
       })
       allChecked = false
       this.setState({
           user_data,
           allChecked
       })
   }
   // handle search value in input boxes
   searchName = (event) => {
       let { searched_data } = this.state;
       let search_value = event.target.value.toLowerCase()
       let usersearch = searched_data.filter(_detail =>  _detail.name.toLowerCase().startsWith(search_value))
       this.setState({
           user_data : usersearch
       })
   }
  
    render(){
        let { user_data, allChecked, all_flag } = this.state;
        let dataList =  user_data.map((_data,index) => {
        return <tr key={index} className={_data.is_checked ? "selected" : ""}>
                    <td><input type="checkbox"  onChange={()=>this.checkedChange(_data.ID)} checked={_data.is_checked} /></td>
                    <td>{_data.ID}</td>
                    <td>{_data.name}</td>
                    <td onClick={()=>this.editFlag(_data.ID)}>{ _data.is_edit ? <input type="number" name="editable_value" autoFocus onChange={(event)=>this.updateValue(event, _data.ID)} value={_data.price} /> : _data.price}</td>
                    <td>{_data.Coupan}</td>
                    <td>{_data.in_stock}</td>
                </tr>
        })
        return(
        <div>
            <table>
                <thead>
                <tr>
                    <td>
                        <input 
                        type="checkbox"
                        ref={ input => {if (input && all_flag && !allChecked) {input.indeterminate = true;} }}
                        checked={allChecked}
                        onChange={this.checkedAll}/>
                    </td>
                    <td>ID</td>
                    <td>Name <br/><input placeholder="Enter Name" onChange={this.searchName} name="searchName" /></td>
                    <td>Price</td>
                    <td>Coupan</td>
                    <td>In Stock</td>   
                </tr>
                </thead>
                <tbody>
                    {dataList}
                </tbody>
            </table>
            <center>
                <button onClick={this.handleDelete}>
                    Delete
                </button>
                <button
                 onClick = {this.handleReset}
                >
                    Reset
                </button>
            </center>
        </div>
        )
    }
}

export default TableExample;
