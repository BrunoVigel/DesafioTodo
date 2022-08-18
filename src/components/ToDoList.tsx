import styles from './ToDoList.module.css'
import Plus from '../assets/plus.svg'
import Clipboard from '../assets/Clipboard.svg'
import { ListItem } from './ListItem'
import { ChangeEvent, FormEvent, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

export type TaskProps = {
    TaskDescription: string;
    IsChecked: boolean;
    id: string;
}

export function ToDoList() {
    const [tasks, setTasks] = useState<TaskProps[]>([])
    const [inputText, setInputText] = useState('')

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        setInputText(event.target.value)
    }

    function handleCreateTask(event: FormEvent) {
        event.preventDefault()

        const newTask = {
            TaskDescription: inputText,
            IsChecked: false,
            id: uuidv4(),
        }

        setTasks(prevState => [...prevState, newTask])

        setInputText('')
    }

    function deleteTask(taskToDelete: string) {
        const tasksWithoutDeletedOne = tasks.filter(task => {
            return task.id !== taskToDelete
        })

        setTasks(tasksWithoutDeletedOne)
    }

    function handleCheckbox(id: string) {
        const changedTasks = tasks.map(task => {
          if (task.id == id) {
            return {
              ...task,
              IsChecked: !task.IsChecked
            }
          }
    
          return task
        })
        
        setTasks(changedTasks)
    }

    const checkedItems = tasks.filter(function(el) {
        return el.IsChecked == true
    })


    return(
        <div className={styles.toDoList}>
            <form className={styles.newTask} onSubmit={handleCreateTask}>
                <input 
                    type="text"  
                    placeholder='Adicione uma tarefa aqui' 
                    required
                    onChange={handleInputChange}
                    value={inputText}
                />
                <button type="submit">Criar <img src={Plus}/></button>
            </form>
            <div className={styles.progressInfo}>
                <div className={styles.createdProgress}>
                    <p>Tarefas criadas {tasks ? <span>{tasks.length}</span> : <span>0</span>}</p> 
                </div>
                <div className={styles.doneProgress}>
                    <p>Concluídas {tasks.length > 0 ? <span>{checkedItems.length} de {tasks.length}</span> : <span>0</span>}</p> 
                </div>
            </div>

            {tasks.length > 0 ? tasks.map(task => {
                    return <ListItem 
                        key={task.id} 
                        isChecked={task.IsChecked} 
                        itemId={task.id} 
                        inputTask={task.TaskDescription} 
                        onDeleteTask={deleteTask} 
                        onChangeCheckbox={handleCheckbox}
                    />
                })
             :
            <div className={styles.emptyList}>
                <img src={Clipboard} alt="" />
                <div className={styles.text}>
                    <p>Você ainda não tem tarefas cadastradas</p>
                    <p>Crie tarefas e organize seus itens a fazer</p>
                </div>
            </div>
            }
        </div>
    )
}