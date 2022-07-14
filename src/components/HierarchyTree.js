import '../styles/Component.css'
import '../styles/Employee.css'
import {employeeList} from '../dataArrays/userArrays'
import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, LayoutAnimation } from  'react-native'
import {AiOutlineDown} from 'react-icons/ai'

function createTree(list){
    let positions = {};
    let roots = [];
    let newObjs = []
    list.forEach((employee,i) => {
        positions[employee.EmployeeNumber] = i;
        newObjs.push({
            isExpanded:false, category: `${employee.EmployeeNumber}`, item: employee, children:[]
        })
        employee.children = [];
    });
    newObjs.forEach((employee) => {
        if(employee.item.ReportingLine === -1){
            roots.push(employee)
            return
        }
        const parent = newObjs[positions[employee.item.ReportingLine]]
        parent.children = [...(parent.children), employee]
    });

    let content = []

    roots.forEach(employee => {
        content.push(employee)
    });

    return content
}

function TopLevelStaff(props){
    const [layoutHeight, setlayoutHeight] = useState(0)
    const employee = props.employee
    const func = props.onClickFunction

    useEffect(()=>{
        if(employee.isExpanded){
            setlayoutHeight(null)
        }
        else{
            setlayoutHeight(0)
        }
    },[employee.isExpanded])

    return(
        <View>
            <TouchableOpacity style={styles.role} onPress={func}>
                <Text style={styles.itemText}>
                    <AiOutlineDown/>
                    <Employee employee={employee.item} level={0} />
                </Text>
            </TouchableOpacity>
            <View style={{height:layoutHeight,overflow:'hidden'}}>
                {
                    employee.children.map((empl,key) => {
                        return <NextLevelStaff key={key} employee={empl} level={1}/>
                    })
                }
            </View>
        </View>
    )
}

function NextLevelStaff(props){
    const employee = props.employee
    const level = props.level
    
    return (
        <View style={{padding:2}}>
            <Staff employee={employee} level={level} />
            <View style={{height:null,overflow:'hidden'}}>
                {
                    employee.children.map((emp,key) => {
                        return (
                            <View key={key} style={{padding:2}}>
                                <Staff employee={emp} level={level+1} />
                                <View style={{height:null,overflow:'hidden'}}>
                                    {
                                        emp.children.map((empl,keya) => {
                                            if(empl.children.length === 0){
                                                return (
                                                    <View key={keya} style={{padding:2}}>
                                                        <Staff employee={empl} level={level+2}/>
                                                    </View>
                                            )}
                                            return null
                                        })
                                    }
                                </View>
                            </View>
                            // <NextLevelStaff key={keya} employee={employee} level={level+1}/>
                        )
                    })
                }
            </View>
        </View>
    )
}

function Staff(props){
    const employee = props.employee
    const level = props.level
    if(employee.children.length !== 0){
        return (
            <Text style={styles.subItemText}>
                <AiOutlineDown style={{fontSize:16,fontWeight:'500',paddingLeft: `${level * 20}px`}}/>
                <Employee employee={employee.item}/>
            </Text>
        )
    }
    
    return (
        <Text style={styles.subItemText}>
            <Text style={{fontSize:16,fontWeight:'500',paddingLeft: `${level * 24}px`}}>-</Text>
            <Employee employee={employee.item}/>
        </Text>
    )
}

function Employee(props){
    const employee = props.employee
    return (
        <Text style={{fontSize:16,fontWeight:'500'}}>
            <span className={`role-${employee.Role}`}>{employee.Role}</span> 
            <span className='NameNumber'>{employee.EmployeeNumber} - {employee.Name} {employee.Surname}</span>
        </Text>
    )
}

function Hierarchy(props) {
    let content
    if(props.employees !== ''){
        content = createTree(props.employees)
    }
    else{
        content = createTree(employeeList)
    }

    const[listData,setListData] = useState(content)

    return (
        <div id="Hierarchy" className="Hierarchy">
            <SafeAreaView style={{flex:1}}>
                <View style={styles.container}>
                    <View>
                        <Text style = {styles.titleText}>
                            Company Hierarchy
                        </Text>
                        {
                            listData.map((employee,key)=>
                                {   
                                    return <TopLevelStaff key={key} employee={employee} onClickFunction={()=>{ 
                                        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                                        const array = [...listData]
                                        array.map((value,place) => 
                                            place === key? (array[place]['isExpanded'] = !array[place]['isExpanded']):(array[place]['isExpanded'] = false)
                                        )
                                        setListData(array)
                                    }}/>
                                }
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
        padding:2
    },
    titleText:{
        flex:1,
        fontSize:22,
        fontWeight: 'bold',
    },
    headerButton:{
        textAlign: 'center',
        justifyContent: 'center',
        fontSize:18
    },
    role:{
        backgroundColor: '#282c34',
        borderRadius:20,
        padding:3,
        margin: 2,
        height: 34,
    },
    itemText:{
        color:'white',
        height: 36,
        fontSize:16,
        fontWeight:'500',
        padding:3,
    },
    subItemText:{
        height: 35,
        fontSize:16,
        fontWeight:'500',
        padding:3,
    },
    content:{
        height: 34,
        paddingLeft:10,
        paddingRight:10,
        backgroundColor: 'white'
    },
    text:{
        height: 34,
        fontSize: 16,
        padding: 10,
    }
})

export default Hierarchy;
