import styles from './ListItem.module.css'
import {CheckCircle, Circle, Trash } from 'phosphor-react'
import Checked from '../assets/Checked.svg'

export type ListProps = {
    inputTask: string,
    itemId: string;
    isChecked: boolean;
    onChangeCheckbox: (task: string) => void;
    onDeleteTask: (task: string) => void;
}

export function ListItem({inputTask, onDeleteTask, itemId, onChangeCheckbox, isChecked}: ListProps) {
    function handleDeleteTask() {
        onDeleteTask(itemId)
    }

    function handleCheckbox() {
        onChangeCheckbox(itemId)
    }

    return(
        <div className={styles.listItem}>
            <button onClick={handleCheckbox}>
                {isChecked == false ? 
                    <Circle 
                        className={styles.NotCheckedCircle} 
                        size={24} 
                        color={'#4EA8DE'} 
                    /> : 
                    <img src={Checked} className={styles.CheckedCircle}></img>}
            </button> 
            <p className={isChecked ? styles.CheckedItem : styles.NotCheckedItem}>{inputTask}</p>
            <button className={styles.trashIcon}>
                <Trash  onClick={handleDeleteTask} size={24}/>
            </button>
        </div>
    )
}
