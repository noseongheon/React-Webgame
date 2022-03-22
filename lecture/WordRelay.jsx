const React = require('react');
const { useState, useRef } = React;

const WordRelay = () => {   //  <<< 이거는 hooks 버전
    const [word, setWord] = useState('성헌');
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const onRefInput = useRef(null);

    const onSubmitForm = (e) => {
        e.preventDefault();
        if (this.state.word[this.state.word.length - 1] === this.state.value[0]) {
            setResult('딩동댕');
            setWord(value);
            setValue('');
            inputRef.current.focus();
        } else{
            setResult('땡');
            setValue('');
            inputRef.current.focus();
        }
    };

    const onChangeInput = (e) => {
        this.setState({ 
            value: e.target.value 
        });
    };

    return (
    <>
        <div>{word}</div>
        <form onSubmit={onSubmitForm}>
            <label id="label" htmlFor='wordInput'>글자를 입력하세요.</label>
            <input id="wordInput" className="wordInput" ref={onRefInput} value={value} onChange={onChangeInput} />
            <button>입력!!</button>
        </form>
        <div>{result}</div>
    </>
    )
}



// class WordRelay extends Component {   //  <<< 이거는 class버전
//     state = {
//         word: '성헌',
//         value: '',
//         result: '',
//     }

//     onSubmitForm = (e) => {
//         e.preventDefault();
//         if (this.state.word[this.state.word.length - 1] === this.state.value[0]) {
//             this.setState({
//                 result: '딩동댕',
//                 word: this.state.value,
//                 value: '',
//             });
//             this.input.focus();
//         } else{
//             this.setState({
//                 result: '땡',
//                 value: '',
//             })
//         }
//     };

//     onChangeInput = (e) => {
//         this.setState({ 
//             value: e.target.value 
//         });
//     };

//     input;

//     onRefInput = (c) => {
//         this.input = c;
//     }

//     render() {
//         return (
//         <>
//             <div>{this.state.word}</div>
//             <form onSubmit={this.onSubmitForm}>
//                 <input ref={this.onRefInput} value={this.state.value} onChange={this.onChangeInput} />
//                 <button>입력!!</button>
//             </form>
//             <div>{this.state.result}</div>
//         </>
//         )
//     }
// }

module.exports = WordRelay;