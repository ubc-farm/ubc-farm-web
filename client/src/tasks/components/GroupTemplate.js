/**
 * Created by Xingyu on 6/19/2017.
 */

class Group extends Component {
    render(){
        let {group} = this.props;

        return (
            <div>
                <label>{group.content}</label>
            </div>
        )
    }
}