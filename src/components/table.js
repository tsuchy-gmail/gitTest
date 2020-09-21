import React, { Component, useState } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { render } from 'react-dom';




class JobsTable extends Component {

  constructor(props) {
    super(props)
    this.state = {
      row: [],
      id: [],
      pickup: [],
      delivery: [],
      dimId: [[], [], []],
      size: [[], [], []],
      selectNumber: [],

    }
    this.myRef = React.createRef()

  }
  handleChangeId(e, i) {
    const copy = this.state.id
    copy[i] = e.target.value
    this.setState({ id: copy })
    console.log(this.state.id[i])
  }

  handleChangePickup = (e, i) => {
    const copy = this.state.pickup
    copy[i] = e.target.value
    this.setState({ pickup: copy })
    console.log(this.state.pickup[i])
  }
  handleChangeDelivery(e, i) {
    const copy = this.state.delivery
    copy[i] = e.target.value
    this.setState({ delivery: copy })
    console.log(this.state.delivery[i])

  }
  handleChangeDimId(e, i) {
    const copy=this.state.dimId
    copy[this.state.selectNumber[i]][i]=e.target.value
    this.setState({dimId: copy})
    console.log(this.state.dimId[this.state.selectNumber[i]])
  }
  
  handleChangeSize(e, i) {
    const copy=this.state.size
    copy[this.state.selectNumber[i]][i]=e.target.value
    this.setState({size: copy})
    console.log(this.state.size[this.state.selectNumber[i]])
  }

  handleSelectChange(e, i){

    const copy=this.state.selectNumber
    copy[i]=e.target.value
    const dimid=this.state.dimId
    const size=this.state.size

    if(dimid[e.target.value][i]===undefined){
      dimid[e.target.value][i]=""
    }
    if(size[e.target.value][i]===undefined){
      size[e.target.value][i]=""
    }
    this.setState({selectNumber: copy})
    this.setState({dimId: dimid})
    this.setState({size: size})

  }

  
  purge(){
    const cof=window.confirm('本当に全て削除しますか？')
    if(cof){
      this.setState({
        row: [],
        id: [],
        pickup: [],
        delivery: [],
        dimId: [[], [], []],
        size: [[], [], []],
        selectNumber: [],
      })
    }else{
      return
    }
  }

  deleteRow = (i) => {

    const copyId = this.state.id.slice()
    const copyPickup = this.state.pickup.slice()
    const copyDelivery = this.state.delivery.slice()
    const copySelectNumber = this.state.selectNumber.slice()
    const copyDimId=this.state.dimId.slice()
    const copySize=this.state.size.slice()
    const copyRow = this.state.row.slice()

    copyId.splice(i, 1)
    copyPickup.splice(i, 1)
    copyDelivery.splice(i, 1)
    copySelectNumber.splice(i, 1)
    for(let n=0; n<3; n++){
        copyDimId[n].splice(i, 1)
        copySize[n].splice(i, 1)     
    }
    
    copyRow.splice(i, 1)
    for(let num=0; num<copyRow.length; num++){
      if(copyId[num]===undefined){
        copyId[num]=""
      }
      if(copyPickup[num]===undefined){
        copyPickup[num]=""
      }
      if(copyDelivery[num]===undefined){
        copyDelivery[num]=""
      }
      for(let N=0; N<3; N++){
        if(copyDimId[N][num]===undefined){
          copyDimId[N][num]=""
        }
        if(copySize[N][num]===undefined){
          copySize[N][num]=""
        }
      }
    }
    
    this.setState({ id: copyId })
    this.setState({ pickup: copyPickup })
    this.setState({ delivery: copyDelivery })
    this.setState({dimId: copyDimId})
    this.setState({size: copySize})
    this.setState({selectNumber: copySelectNumber})
    this.setState({ row: copyRow })

    
  }

  addRow() {

    const number=this.state.selectNumber
    number.push(0)
    this.setState({selectNumber: number})
    console.log(this.state.selectNumber)
    console.log(this.state.selectNumber[0])
    const Row = (i) => {

      const row =
        <tr>
          <td>

            <input type='text'  value={this.state.id[i]} onChange={(e) => {
              this.handleChangeId(e, i)
              console.log(this.state.id)


            }}></input></td>
          <td><input type='text' value={this.state.pickup[i]} onChange={(e) => {
            this.handleChangePickup(e, i)
            console.log(this.state.pickup)
          }} value={this.state.pickup[i]} ></input></td>
          <td><input type='text' value={this.state.delivery[i]} onChange={(e) => {
            this.handleChangeDelivery(e, i)
            console.log(this.state.delivery)
          }}></input></td>
          <td>
            <select value={this.state.selectNumber[i]} onChange={e=>this.handleSelectChange(e, i) } style={{width: '100%'}}>
              <option value='0'>1</option>
              <option value='1'>2</option>
              <option value='2'>3</option>
            </select>
          </td>
          <td><input type='text' onChange={(e)=>this.handleChangeDimId(e, i)} value={this.state.dimId[this.state.selectNumber[i]][i]}></input></td>
          <td><input type='number' onChange={(e)=>this.handleChangeSize(e, i)} value={this.state.size[this.state.selectNumber[i]][i]}></input></td>
          <td><button onClick={() => this.deleteRow(i)}>X</button></td>
        </tr>
      return row;
    }
    const copy = this.state.row
    copy.push(Row)
    console.log(this.state.row)

    console.log(this.state.selectNumber)
    this.setState({ row: copy })

  }

  componentDidUpdate(){
    const length=this.state.row.length
    localStorage.rowLength=length


    localStorage.state=JSON.stringify(this.state)
    localStorage.number=JSON.stringify(this.state.selectNumber)


  }

  componentDidMount(){
    const arr=[]
    const Row = (i) => {

      const row =
        <tr>
          <td>

            <input type='text'  value={this.state.id[i]} onChange={(e) => {
              this.handleChangeId(e, i)
              console.log(this.state.id)


            }}></input></td>
          <td><input type='text' value={this.state.pickup[i]} onChange={(e) => {
            this.handleChangePickup(e, i)
            console.log(this.state.pickup)
          }} value={this.state.pickup[i]} ></input></td>
          <td><input type='text' value={this.state.delivery[i]} onChange={(e) => {
            this.handleChangeDelivery(e, i)
            console.log(this.state.delivery)
          }}></input></td>
          <td>
            <select value={this.state.selectNumber[i]} onChange={e=>this.handleSelectChange(e, i) } style={{width: '100%'}}>
              <option value='0'>1</option>
              <option value='1'>2</option>
              <option value='2'>3</option>
            </select>
          </td>
          <td><input type='text' onChange={(e)=>this.handleChangeDimId(e, i)} value={this.state.dimId[this.state.selectNumber[i]][i]}></input></td>
          <td><input type='number' onChange={(e)=>this.handleChangeSize(e, i)} value={this.state.size[this.state.selectNumber[i]][i]}></input></td>
          <td><button onClick={() => this.deleteRow(i)}>X</button></td>
        </tr>
      return row;
    }
    let i=0
    while(i<Number(localStorage.rowLength)){
      arr.push(Row)
      i++
    }

    const num=localStorage.number ? JSON.parse(localStorage.number) : []
    const Num=num.map(i=>Number(i))
    
    console.log(Num)

    const parse=localStorage.state ? JSON.parse(localStorage.state) : {
      row: [],
      id: [],
      pickup: [],
      delivery: [],
      dimId: [[], [], []],
      size: [[], [], []],
      selectNumber: [],

    }
    this.setState({
      id: parse.id||[],
      pickup: parse.pickup||[],
      delivery: parse.delivery||[],
      dimId: parse.dimId||[[], [], []],
      size: parse.size||[[], [], []],
      selectNumber: Num||[],
      row: arr,
    })
  }


  render() {
    return (
      <div>
        <Button onClick={()=>this.purge()}>Purge</Button>
        <Button onClick={() => { this.addRow() }} variant='warning' style={{width: '100%'}}>Add</Button>
        <Table bordered striped hover >
          <thead>
            <tr>
              <th>id</th>
              <th>pickup</th>
              <th>delivery</th>
              <th>demands</th>
              <th>dimId</th>
              <th>size</th>
              <th>❎</th>
            </tr>
          </thead>
          <tbody>
            {this.state.row.map((item, index) => item(index))}
          </tbody>

        </Table>
      </div>
    )
  }

}

export default JobsTable;