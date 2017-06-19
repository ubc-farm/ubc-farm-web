/**
 * Created by Xingyu on 6/19/2017.
 */

class ItemTemplate extends Component {
    render(){
        let {item} = this.props;

        return (
            <div>
                <label>{item.content}</label>
            </div>
        )
    }
}