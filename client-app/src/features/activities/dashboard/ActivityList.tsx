import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { SyntheticEvent } from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';


export default observer(function ActivityList() {

    const {activityStore} = useStore();
    const { deleteActivity, activitiesByDate, loading } = activityStore;

    const [target, setTarget] = useState('');

    function handleActivityDelete(event: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(event.currentTarget.name);
        deleteActivity(id);
    }

    return (
        <Segment>
            <Item.Group divided>
                {activitiesByDate.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a' onClick={() => activityStore.selectActivity(activity.id)}>
                                {activity.title}
                            </Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button floated='right' content='View' color='blue'
                                    onClick={() => activityStore.selectActivity(activity.id)} />
                                <Button name={activity.id}
                                    floated='right' 
                                    loading={loading && target === activity.id}
                                    content='Delete' color='red'
                                    onClick={(event) => handleActivityDelete(event, activity.id)} 
                                />
                                <Label basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    );
})