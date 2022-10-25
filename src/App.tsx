import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import Button from '@cloudscape-design/components/button';
import ButtonDropdown from '@cloudscape-design/components/button-dropdown';
import DateRangePicker from '@cloudscape-design/components/date-range-picker';

const apiUrl = import.meta.env.VITE_API_URL;
const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

function App() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('');
  const [value, setValue] = useState(null);
  useEffect(() => {
    const fetchUrl = async () => {
      const res = await fetch(`${apiUrl}/helloworld`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ name: 'lucas' }),
      });
      const data = await res.text();
      setMessage(data);
    };
    fetchUrl();
  }, []);

  return (
    <div className='App'>
      <div>
        <a href='https://vitejs.dev' target='_blank'>
          <img src='/vite.svg' className='logo' alt='Vite logo' />
        </a>
        <a href='https://reactjs.org' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className='card'>
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <p>message from api: {message}</p>
        <Button>Hello CloudScape!</Button>
        <ButtonDropdown
          items={[
            { text: 'Delete', id: 'rm', disabled: false },
            { text: 'Move', id: 'mv', disabled: false },
            { text: 'Rename', id: 'rn', disabled: true },
            {
              text: 'View metrics',
              href: 'https://example.com',
              external: true,
              externalIconAriaLabel: '(opens in new tab)',
            },
          ]}
        >
          Test Short
        </ButtonDropdown>
      </div>
      <DateRangePicker
        onChange={({ detail }) => setValue(detail.value)}
        value={value}
        relativeOptions={[
          {
            key: 'previous-5-minutes',
            amount: 5,
            unit: 'minute',
            type: 'relative',
          },
          {
            key: 'previous-30-minutes',
            amount: 30,
            unit: 'minute',
            type: 'relative',
          },
          {
            key: 'previous-1-hour',
            amount: 1,
            unit: 'hour',
            type: 'relative',
          },
          {
            key: 'previous-6-hours',
            amount: 6,
            unit: 'hour',
            type: 'relative',
          },
        ]}
        i18nStrings={{
          todayAriaLabel: 'Today',
          nextMonthAriaLabel: 'Next month',
          previousMonthAriaLabel: 'Previous month',
          customRelativeRangeDurationLabel: 'Duration',
          customRelativeRangeDurationPlaceholder: 'Enter duration',
          customRelativeRangeOptionLabel: 'Custom range',
          customRelativeRangeOptionDescription: 'Set a custom range in the past',
          customRelativeRangeUnitLabel: 'Unit of time',
          formatRelativeRange: (e) => {
            const t = 1 === e.amount ? e.unit : `${e.unit}s`;
            return `Last ${e.amount} ${t}`;
          },
          formatUnit: (e, t) => (1 === t ? e : `${e}s`),
          dateTimeConstraintText: 'Range must be between 6 and 30 days. Use 24 hour format.',
          relativeModeTitle: 'Relative range',
          absoluteModeTitle: 'Absolute range',
          relativeRangeSelectionHeading: 'Choose a range',
          startDateLabel: 'Start date',
          endDateLabel: 'End date',
          startTimeLabel: 'Start time',
          endTimeLabel: 'End time',
          clearButtonLabel: 'Clear and dismiss',
          cancelButtonLabel: 'Cancel',
          applyButtonLabel: 'Apply',
        }}
        placeholder='Filter by a date and time range'
      />
      <p className='read-the-docs'>Click on the Vite and React logos to learn more</p>
    </div>
  );
}

export default App;
