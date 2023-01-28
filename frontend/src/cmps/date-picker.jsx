import '../../node_modules/react-date-range/dist/styles.css';
import '../../node_modules/react-date-range/dist/theme/default.css';

import { DateRangePicker } from 'react-date-range';

class MyComponent extends Component {
  handleSelect(ranges) {
    console.log(ranges);
    // {
    //   selection: {
    //     startDate: [native Date Object],
    //     endDate: [native Date Object],
    //   }
    // }
  }
  render() {
    const selectionRange = {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    }
    return (
      <DateRangePicker
        ranges={[selectionRange]}
        onChange={this.handleSelect}
      />
    )
  }
}