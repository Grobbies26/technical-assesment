import '../styles/Employee.css'
import '../styles/Component.css'
import {employeeList, summaryContent} from '../dataArrays/userArrays'
import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, LayoutAnimation } from  'react-native'
import {AiOutlineDown} from 'react-icons/ai'

function sort(employees){
    for(let i = 0; i < employees.length-1; i++){
        let highest = employees[i]
        for(let j = i+1; j < employees.length; j++ ){
            if(highest.Salary < employees[j].Salary){
                let temp = employees[j]
                employees[j] = employees[i]
                employees[i] = temp 
            }
        }
    }

    return employees
}

function groupByRole(list){
    let managers = []
    let employees = []
    let trainees = []
    list.forEach(employee => {
        if(employee.Role === "Manager"){
            managers.push(employee)
        }
        else if(employee.Role === "Employee"){
            employees.push(employee)
        }
        else{
            trainees.push(employee)
        }
    });

    summaryContent[0].items = sort(managers)
    summaryContent[1].items = sort(employees)
    summaryContent[2].items = sort(trainees)
}

function Roles(props){
    const [layoutHeight, setlayoutHeight] = useState(0)
    const role = props.item
    const func = props.onClickFunction

    useEffect(()=>{
        if(role.isExpanded){
            setlayoutHeight(null)
        }
        else{
            setlayoutHeight(0)
        }
    },[role.isExpanded])

    return(
        <View>
            <TouchableOpacity style={styles.role} onPress={func}>
                <Text style={styles.itemText}>
                    <AiOutlineDown/>
                    <span className={`role-${role.items[0].Role}`}>{role.items[0].Role}</span> 
                    <span className='NameNumber'> {role.items[0].Name} {role.items[0].Surname}</span>
                    <span className='Salary'>R{role.items[0].Salary}.00</span>
                </Text>
            </TouchableOpacity>
            <View style={{height:layoutHeight,overflow:'hidden'}}>
                {
                    role.items.map((employee,key) => {
                        if(key===0){
                            return null
                        }
                        return (
                            <Text key={key} style={styles.text}>
                                <span className='NameNumber'>{key+1} - {employee.Name} {employee.Surname}</span>
                                <span className='Salary'>R{employee.Salary}.00</span>
                            </Text>
                        )
                    })
                }
            </View>
        </View>
    )
}

function SummaryEmployee(props) {
    if(props.employees !== ''){
        groupByRole(props.employees)
    }
    else{
        groupByRole(employeeList)
    }

    groupByRole(employeeList)
    const[listData,setListData] = useState(summaryContent)
    const updateLayout = (index) =>{
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        const array = [...listData]

        array.map((value,place) => 
            place === index? (array[place]['isExpanded'] = !array[place]['isExpanded']):(array[place]['isExpanded'] = false)
        )
        setListData(array)
    }

    return (
        <div id="Summary" className="Summary">
            <SafeAreaView style={{flex:1}}>
                <View style={styles.container}>
                    <View>
                        <Text style = {styles.titleText}>
                            Summary of Top Earners per Role 
                        </Text>
                        {
                            listData.map((item,key)=>
                                <Roles key={item.category} item={item} onClickFunction={()=>{ updateLayout(key)}}/>
                            )
                        }
                    </View>
                </View>
            </SafeAreaView>
        </div>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    titleText:{
        flex:1,
        fontSize:22,
        fontWeight: 'bold',
        paddingLeft: 10
    },
    headerButton:{
        textAlign: 'center',
        justifyContent: 'center',
        fontSize:18
    },
    role:{
        backgroundColor: '#282c34',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:20,
        padding:3,
        margin: 2,
        height: 34,
        width:"350px"
    },
    itemText:{
        color:'white',
        fontSize:16,
        fontWeight:'500',
        
    },
    content:{
        paddingLeft:10,
        paddingRight:10,
        backgroundColor: 'white',
        alignItems:'center',
        justifyContent:'center'
    },
    text:{
        fontSize: 16,
        padding: 10,
        
    },
})

export default SummaryEmployee;
