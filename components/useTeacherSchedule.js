import { useState, useEffect } from 'react';

const useTeacherSchedule = (teacherId) => {
    const [schedule, setSchedule] = useState([]);

    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                const scheduleResponse = await fetch(`http://127.0.0.1:8000/teacher_schedule/${teacherId}/`);
                const scheduleData = await scheduleResponse.json();
                setSchedule(scheduleData);
            } catch (error) {
                console.error('Error fetching teacher schedule:', error);
            }
        };

        if (teacherId) {
            fetchSchedule();
        }
    }, [teacherId]);

    return schedule;
};

export default useTeacherSchedule;
