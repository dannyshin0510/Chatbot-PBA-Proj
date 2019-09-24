import React, { Component } from 'react';
import ChatBot from 'react-simple-chatbot';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';

class TransactionComplete extends Component {
    constructor(props) {
      super(props);
      this.state = {
        amount: '',
        people: '',
        myAccounts: '',
      };
    }
  
    componentWillMount() {
      const { steps } = this.props;
      const { amount, people, myAccounts } = steps;

      this.setState({ amount, people, myAccounts });
    }
  
    render() {
      const { amount, people, myAccounts } = this.state;
      return (
        <div style={{ width: '100%' }}>
          <h3 style={{float:"left"}}>Summary of Transaction</h3>
          <img style={{float:"right", width:"50px"}}src="/images/logo.png" />
          <br></br>
          <table style={{clear:"both"}}>
            <tbody>
              <tr>
                <td>Recipient: </td>
                <td></td>
                <td>{people.value}</td>
              </tr>
              <tr>
                <td>Sent: </td>
                <td></td>
                <td>${amount.value}</td>
              </tr>
              <tr>
                <td>New Balance in {myAccounts.value}: </td>
                <td></td>
                <td>${2000.00 - amount.value}</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
  }
  
TransactionComplete.propTypes = {
    steps: PropTypes.object,
};
  
TransactionComplete.defaultProps = {
    steps: undefined,
};  
class Report extends Component {
  render() {
    return (
      <div style={{ width: '100%' }}>
        <h1 style={{float:"left"}}>Monthly Spendings: Food/Restraunts</h1>
        <img style={{float:"right", width:"50px"}}src="/images/logo.png" />
        <p style={{clear:"both"}}>Powered by CIBC. MMI</p>
        <br></br>
        <table style={{clear:"both"}}>
          <tbody>
            <tr>
              <td>Total Spending for the month of: JULY </td>
              <td></td>
              <td>$253.20</td>
              <td><small>(High)</small></td>
            </tr>
            <br/>
            <br/>
            <h3 style={{float:"left"}}>Most significant spendings...</h3>
            <tr>
              <td>McDonalds: </td>
              <td></td>
              <td>$59.22</td>
            </tr>
            <tr>
              <td>Poke Guys: </td>
              <td></td>
              <td>$52.95</td>
            </tr>
            <tr>
              <td>Crocs on Rocs: </td>
              <td></td>
              <td>$46.24</td>
            </tr>
            
          </tbody>
        </table>
      </div>
    );
  }
}
class Chat extends Component{
  render(){
      return (
        <div style={centerThis}>
            <ThemeProvider theme={theme}>
                <ChatBot
                        style={{marginBottom:"100px"}}
                        steps={messages}
                        headerTitle="CIBC: Penny"  
                        // bsotAvatar="./pennyUser.png"
                        width="500px"
                    />  
            </ThemeProvider>
        </div>
      );
  }
}
const messages=[
      {
        id: '1',
        message: 'Hi Danny!',
        trigger: '1.1',
      },
      {
        id: '1.1',
        message: '* You have spent 90% of your credit limit for the month. I recommend looking into this NEW account!',
        trigger: 'ad',
      },
      { 
        id: 'ad',
        component: (
          <div >
            <a target="blank" link="www.cibc.com"><p style={{textAlign:"center"}}>Click to learn more about fees!</p></a>
            <img src="../images/ad.png" />
          </div>
        ),
        trigger:'1.5'
      },
      {
        id: '1.5',
        message: 'How can I help?',
        trigger: 'branch',
      },
      {
        id: 'branch',
        user:true,
        trigger:"etransfer"
      },
      {
        id: 'etransfer',
        message:"Sure! Please choose an account to send from: ",
        trigger:"myAccounts"
      },
      {
        id: 'myAccounts',
        options: [
          { value: "Student Plus", label: 'Student Plus: $1200.23', trigger: 'to' },
          { value: "Adventura", label: 'Adventura: $2000.00', trigger: 'to' },
          
        ],
      },
      {
        id: 'to',
        message:"Who do you wish to send it to? ",
        trigger:"people"
      },
      {
        id: 'people',
        options: [
          { value: 'Sammy', label: 'Sammy', trigger: '3.5' },
          { value: 'Anna', label: 'Anna', trigger: '3.5' },
          { value: 'Jason', label: 'Jason', trigger: '3.5' },
          { value: 'Fred', label: 'Fred', trigger: '3.5' },
          { value: 'Tyson', label: 'Tyson', trigger: '3.5' },
          { value: 'Maddy', label: 'Maddy', trigger: '3.5' },
        ],
      },
      {
        id: '2',
        options: [
          { value: 1, label: 'eTransfer', trigger: '3.5' },
          { value: 2, label: 'Check balance', trigger: '3.5' },
          { value: 3, label: 'Bills', trigger: '3.5' },
        ],
      },
      
      {
        id: '3.5',
        message: 'Awesome! How much would you like to send?',
        trigger:'amount',
      },
      
      {
        id: 'amount',
        placeholder:"$ enter value amount...",
        user:true,
        trigger:'6',
      },
      {
        id: '6',
        message: 'Please confirm that you would like to send: ${previousValue}.',
        trigger:'confirm'
      },
      {
        id:"confirm",
        options: [
          { label: 'Yes', trigger: '7' },
          { label: 'No', trigger: '7' },
        ],
      },
      {
        id: '7',
        message: 'Sending...',
        delay:2000,
        trigger: '8',
      },
      {
        id: '8',
        message: 'Complete!',
        trigger: 'summary',
      },
      {
        id: 'summary',
        component: <TransactionComplete />,
        trigger: 'loop',
      },
      {
        id: 'loop',
        message: 'Would that be all for today?',
        trigger: 'loopOption',
      },
      {
        id:"loopOption",
        options: [
          { value:"Yes", label: 'Yes', trigger: 'MMIstart' },
          { value:"No",label: 'No', trigger: 'MMIstart' },
        ],
      },
      {
        id: 'MMIstart',
        message: 'How can I help you?',
        trigger: 'input',
      },
      {
        id: 'input',
        user:true,
        trigger:"load",
      },
      {
        id: 'load',
        message: 'Connecting to your MMI...',
        trigger: 'result',
      },
      {
        id: 'result',
        component: < Report />,
        trigger:"MMIstart"
      },
      
];
const theme = {
    background: '#f5f8fb',
    // fontFamily: 'Helvetica Neue',
    headerBgColor: '#eb5959',
    headerFontColor: '#fff',
    headerFontSize: '15px',
    botBubbleColor: '#e33434',
    botFontColor: '#fff',
    userBubbleColor: '#fff',
    userFontColor: '#4a4a4a',
};
const centerThis={
  width:"500px",
 margin: "0 auto",
 marginTop: "50px"
};
export default Chat;