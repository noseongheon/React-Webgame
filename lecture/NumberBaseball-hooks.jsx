import React, {useState} from 'react';
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

const NumberBaseball = () => {
    const [result, setResult] = useState('');
    const [value, setValue] = useState('');
    const [answer, setAnswer] = useState(getNumbers());
    const [tries, setTries] = useState([]);

    const onSubmitForm = (e) => {
        
        e.preventDefault();
        if (value === answer.join('')){
            setResult('홈런!');
            setTries((prevTries) => {
                return [...prevTries, {try: value, result:'홈런!'}]
            });
            alert('게임을 다시 시작합니다!');
            setValue('');
            setAnswer(getNumbers());
            setTries([]);
        }else{
            const answerArray = value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if (tries.length >= 9){
                setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다!`);
                alert('게임을 다시 시작합니다!');
                setValue('');
                setAnswer(getNumbers());
                setTries([]);
            }else{
                for (let i = 0; i<4; i++){
                    if (answerArray[i] === answer[i]){
                        strike += 1;
                    }else if (answer.includes(answerArray[i])){
                        ball += 1;
                    }
                }
                setTries((prevTries) => {
                    return [...tries, {try: value, result: `${strike} 스트라이크, ${ball} 볼`}]
                });
                setValue('');
            }
        }
    };

    const onChangeInput = (e) => {
        setValue(e.target.value);
    };

    return (
        <>
            <h1>{result}</h1>
            <form onSubmit={onSubmitForm}>
                <input maxLength={4} value={value} onChange={onChangeInput} />
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



export default NumberBaseball; // import NumberBaseball