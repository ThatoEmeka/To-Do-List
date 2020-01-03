import React, {Component } from 'react';
import ReactDom from 'react-dom';
import './Style.css'

export class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        newItem: "",
        list: []
      };
    }
  
    //add local storage 
    componentDidMount() {
      this.hydrateStateLocalStorage();
  
      // add event listener to save stat localStorage
      // when user leaves - refreshe
      window.addEventListener(
        "beforeunload",
        this.saveStateToLocalStorage.bind(this)
      );
    }
  
    componentWillUnmount() {
      window.removeEventListener(
        "beforeunload",
        this.saveStateToLocalStorage.bind(this)
      );
  
      // saves if component has a chance to unmount


      this.saveStateToLocalStorage();
    }
  
    hydrateStateLocalStorage() {

      // for all items in state
      for (let key in this.state) {
        // if the key exists in localStorage

        if (localStorage.hasOwnProperty(key)) {
          // get the key's value from localStorage
          let value = localStorage.getItem(key);
  
          // parse the localStorage strng and setState
          try {
            value = JSON.parse(value);
            this.setState({ [key]: value });
          } catch (e) {
            // manage empty string
            this.setState({ [key]: value });
          }
        }
      }
    }
  
    saveStateToLocalStorage() {
      // for every item in React state
      for (let key in this.state) {
        // save to localStorage
        localStorage.setItem(key, JSON.stringify(this.state[key]));
      }
    }
  
    update(key, value) {
      // update react state
      this.setState({ [key]: value });
    }
  
    addItem() {

      // new item with unique identity


      const newItem = {
        id: 1 + Math.random(),
        value: this.state.newItem.slice()
   
      };
  
      // copy current list of items
      const list = [...this.state.list];
  
      // add the new item to the list
      list.push(newItem);
  
      // update state with new list reset the new item input
      this.setState({
        list,
        newItem: ""
      });
    }
  
    deleteItem(id) {
      // copy current list of items
      const list = [...this.state.list];
      // filter the item deleted
      const updatedList = list.filter(item => item.id !== id);
  
      this.setState({ list: updatedList });
    }
    
    render() {
      return (
        <div>
  
        <center><h1 className="app-title">LIST of work To-Do</h1>
          
          <div className="container">
          <div
            style={{
              padding: 30,
              textAlign: "left",
              maxWidth: 500,
              margin: "auto"
            }}
          >
            Add Item
            <br />
            <input
              type="text"
              placeholder="Type item here"
              value={this.state.newItem}
              onChange={e => this.update("newItem", e.target.value)}
            />
            <button
              className="add-btn btn-floating"
              onClick={() => this.addItem()}
              disabled={!this.state.newItem.length}
            >
              <i class="material-icons"> + </i>
            </button>
            <br /> <br />
            <ul>
              {this.state.list.map(item => {
                return (
                  <li key={item.id}>
                    {item.value}
                    <button className="btn btn-floating" onClick={() => this.deleteItem(item.id)}>
                      <i class="material-icons">x</i>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        </center>
        </div>
      );
    }
  }



  //git commit 1  

  //second attempt (excluded) code left for educational purposes
//---------------------------------------------------------------

// class App extends Component {
//     constructor(props){
//         console.log(20);
//         super(props);
        
//         this.state={
//             newItem : "",
//             list:[]
//         }
//     }

//     updateInput(key, value){
//         //update react state
//         this.setState({
//             [key]: value
//         })
//     };

//     addItem(){
//         //create item with new id
//         const newItem={
//             id: 1 + Math.random(),
//             value: this.state.newItem.slice()
//         };

//         //cpoy current list of items
//         const list = [...this.state.list];

//         //add new ietm to list
//         list.push(newItem);

//         //update and reset
//         this.setState({
//             list,
//             newItem:""
//         }); 
//     }
//     deleteItem(id){
//         //copy list of items
//         const list = [...this.state.list];

//         //filter out deleted item
//         const updatedList = list.filter(item => item.id !== id);

//         this.setState({ list: updatedList});
//     }

//     render() {
//         return (
//         <div className="App">
//             <div>
//                 Add an Item...
//                 <br/>
//                 <input
//                 type="text"
//                 placeholder="new work"
//                 value={this.state.newItem}
//                 onChange={e => this.updateInput("newItem", e.target.value)}
//                 />
//                 <button
//                 onClick={() => this.addItem()}
//                 >
//                 Add
//                 </button>
//                 <br/>
//                 <ul>
//                     {this.state.list.map(item => {
//                         return(
//                             <li key={item.id}>
//                                 {item.value}
//                                 <button className="btn btn-floating"
//                                     onCLick={() => this.deleteItem(item.id)}

//                                 >
//                                     X
//                                 </button>
//                             </li>
//                         )
//                     })}
//                 </ul>
//             </div>
//         </div>
//         );
//     }
// }

//  ReactDOM.render(<App />, document.getElementById('root'));

export default App