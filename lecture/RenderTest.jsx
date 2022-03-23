import React, {Component} from 'react';

class Test extends Component {
    state = {
        counter: 0,
    };

    // this.setState 사용하면 state, props에 변화없어도 렌더링이 일어나서 이 함수를 써줌
    // 이거 안쓰고싶으면 Component -> PureComponent 로 해주면 알아서 처리해줌 
    // 근데 pure는 간단한 경우는 괜찮은데 복잡해지면 안먹을 때도 있고, 조건부로 해주고싶을 땐 should 쓰는게 나은듯
    // 강사님은 근데 pure 많이 쓰라고 하시네 잘 사용하면 편하고 좋은듯
    shouldComponentUpdate(nextProps, nextState, nextContext){
        if (this.state.counter !== nextState.counter){
            return true;
        }
        return false;
    }

    onClick = () => {
        this.setState({

        })
    }

    render() {
        console.log('렌더링', this.state);
        return (
            <div>
                <button onClick={this.onClick}>클릭</button>
            </div>
        )
    }

}

export default Test;