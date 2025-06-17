import { useState, useEffect } from 'react';

const TimeDisplay = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);

  useEffect(() => {
    const fetchTimezone = async () => {
      try {
        const response = await fetch('http://ip-api.com/json');
        const data = await response.json();
        if (data.timezone) {
          setTimezone(data.timezone);
        }
      } catch (error) {
        console.error('Error fetching timezone:', error);
        // Already using local timezone as default, so no need to set it again
      }
    };

    const updateTime = () => {
      try {
        const now = new Date();
        const formattedTime = now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
          timeZone: timezone
        });
        setCurrentTime(formattedTime);
      } catch (error) {
        console.error('Error updating time:', error);
        // Fallback to local time if there's an error
        const now = new Date();
        setCurrentTime(now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        }));
      }
    };

    // Initial timezone fetch
    fetchTimezone();
    
    // Update time every second
    updateTime();
    const interval = setInterval(updateTime, 1000);
    
    return () => clearInterval(interval);
  }, [timezone]);

  return (
    <div className="d-flex align-items-center text-light">
      <i className="bi bi-clock me-2"></i>
      <span>{currentTime}</span>
      <small className="ms-2 text-light-50">({timezone})</small>
    </div>
  );
};

export default TimeDisplay; 