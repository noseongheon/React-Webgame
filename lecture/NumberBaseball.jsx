import React, { Component } from 'react';
import Try from './Try';

function getNumbers() { // 숫자 4개 랜덤하게 뽑는 함수 (겹치지 않고)
    const candidate = [1,2,3,4,5,6,7,8,9,0];
    const array = [];
    for (let i = 0; i<4; i++){
        const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
    }
    return array;
}

class NumberBaseball extends Component {
 
    /*
        원래 맨첨에 constructor(props){
            super(props)
            this.state = {

            }
            this.functionName = this.functionName.bind(this); 
        }

        위와 같은 짓을 했었는데 함수에 화살표함수로 선언해버리면 bind 안해줘도 되고 state도 밖에 빼서 쓸 수 있고 constructor도 선언 안해도됨. 좋은듯?
    */
    
    state = {
        result: '',
        value: '',
        answer: getNumbers(),
        tries: [], // push 쓰면 안된대요
    }

    onSubmitForm = (e) => {
        const {result, value, answer, tries} = this.state;
        e.preventDefault();
        if (value === answer.join('')){
            this.setState((prevState) => {
                return {
                    result: '홈런!',
                    tries: [...prevState.tries, {try: value, result:'홈런!'}], 
                    /*
                        아~ 이게 리액트는 state가 변경될 때 렌더링을 하는데. this.state.tries에 맨처음에는 function에서 갖고왔는데 이게 계속 변해야 하니까
                        tries: [...this.state.tries, {try: this.state.value, result:'홈런!'}], 
                        위 문법이 tries라는 객체를 또 만들어서 앞의 인자는 예전꺼 틀을 복사해서 넣고, 뒤의 인자는 새로운 값 넣어준다는데.. 솔직히 좀 헷갈리긴하네 나중에 다시 보자!! 이 문법 헷갈림
                    */
                }
            });
            alert('게임을 다시 시작합니다!');
                this.setState({
                    value: '',
                    answer: getNumbers(),
                    tries: [],
                });
        }else{
            const answerArray = value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if (tries.length >= 9){
                this.setState({
                    result: `10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다!`
                });
                alert('게임을 다시 시작합니다!');
                this.setState({
                    value: '',
                    answer: getNumbers(),
                    tries: [],
                });
            }else{
                for (let i = 0; i<4; i++){
                    if (answerArray[i] === answer[i]){
                        strike += 1;
                    }else if (answer.includes(answerArray[i])){
                        ball += 1;
                    }
                }
                this.setState((prevState) => {
                    return {
                        tries: [...prevState.tries, {try: value, result: `${strike} 스트라이크, ${ball} 볼`}],
                        value: '',
                    }
                    
                })
            }
        }
    };

    onChangeInput = (e) => {
        console.log(this.state.answer);
        this.setState({
            value: e.target.value,
        })
    };

    render() {

        const {result, value, tries} = this.state;

        return (
            <>
                <h1>{result}</h1>
                <form onSubmit={this.onSubmitForm}>
                    <input maxLength={4} value={value} onChange={this.onChangeInput} />
                </form>
                <div>시도: {tries.length}</div>
                <ul>
                    {tries.map((v, i) => {
                        return ( // 화살표 함수에서 {return} 생략가능. 꼭 {} 이랑 같이 없애줘야함
                             // li 반복 돌릴때는 key가 필수!! 아니면 자바스크립트 에러남 실무에선 고유한 key값 정해주는게 귀찮지만 중요
                             // 그리고 이 반복되는 부분만 떼서 다른 파일에 넣을 수도 있음
                            <Try key={`${i+1}차 시도 :`} tryInfo={v} /> // Try 컴포넌트한테 매개변수 넘겨줘야 쓸 수 있음
                        );
                    })}
                </ul>
            </>
        )
    }

}

export default NumberBaseball; // import NumberBaseball