import '../styles/Hierarchy.css';
import {employeeList} from '../dataArrays/userArrays'
import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, LayoutAnimation } from  'react-native'

function createTree(list){
    let positions = {};
    let roots = [];
    let newObjs = []
    list.forEach((employee,i) => {
        positions[employee.EmployeeNumber] = i;
        newObjs.push({
            isExpanded:false, category: `${employee.EmployeeNumber}`, item: employee
        })
        employee.children = [];
    });
    newObjs.forEach((employee) => {
        if(employee.item.ReportingLine === -1){
            roots.push(employee)
            return
        }
        const parent = newObjs[positions[employee.item.ReportingLine]]
        parent.item.children = [...(parent.item.children), employee]
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
                <Employee employee={employee.item} level={0} />
            </TouchableOpacity>
            <View style={{height:layoutHeight,overflow:'hidden'}}>
                {
                    employee.item.children.map((empl,key) => {
                        return (
                            <View key={key}>
                                <Employee employee ={empl.item} level={1}/>
                                <View style={{height:layoutHeight,overflow:'hidden',margin:7}}>{ 
                                    empl.item.children.map((emp,keyb) => {
                                        let parent = <Employee key={keyb} employee ={emp.item} level={2}/>
                                        if(emp.item.children.length !== 0){
                                            return (
                                            <>
                                                {parent}
                                                <View style={{height:layoutHeight,overflow:'hidden',margin:7}}>
                                                    {   
                                                        emp.item.children.map((empb,keyc) => {
                                                            return <Employee key={keyc} employee ={empb.item} level={3}/>
                                                        })
                                                    }
                                                </View>
                                            </>
                                        )}
                                        return parent
                                    }   
                                )}
                                </View>
                            </View>
                        )
                    })
                }
            </View>
        </View>
    )
}

function Employee(props){
    const employee = props.employee
    const level = props.level
    return (
        <Text style={{fontSize:16,fontWeight:'500',paddingLeft: `${level * 50}px`}}>
            <span className={`role-${employee.Role}`}>{employee.Role}</span> 
            <span className='NameNumber'> {employee.Name} {employee.Surname}</span>
            <span className='Salary'>R{employee.Salary}.00</span>
        </Text>
    )
}

function NextLevelStaff(props){
    const [layoutHeight, setlayoutHeight] = useState(0)
    const employee = props.employee
    const func = props.onClickFunction
    const level = props.level

    useEffect(()=>{
        if(employee.isExpanded){
            setlayoutHeight(null)
        }
        else{
            setlayoutHeight(0)
        }
    },[employee.isExpanded])
    
    if(employee.item.children.length === 0){
        return (
            <Employee employee ={employee.item} level={level}/>
        )
    }
    
    return (
        <>
            <TouchableOpacity style={styles.role} onPress={func}>
                <Employee employee ={employee.item} level={level}/>
            </TouchableOpacity>
            <View style={{height:layoutHeight,overflow:'hidden'}}>
                { 
                    employee.item.children.map((emp,key) => {
                        return <Employee key={key} employee ={emp.item} level={level}/>
                    }   
                )}
            </View>
        </>
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
    const updateLayout = (index) =>{
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        const array = [...listData]

        array.map((value,place) => 
            place === index? (array[place]['isExpanded'] = !array[place]['isExpanded']):(array[place]['isExpanded'] = false)
        )
        setListData(array)
    }

    return (
        <div className="Employees">
            <SafeAreaView style={{flex:1}}>
                <View style={styles.container}>
                    <View>
                        <Text style = {styles.titleText}>
                            Company Hierarchy
                        </Text>
                        {
                            listData.map((employee,key)=>
                                <TopLevelStaff key={key} employee={employee} onClickFunction={()=>{ updateLayout(key)}}/>
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
        padding:10
    },
    titleText:{
        flex:1,
        fontSize:22,
        fontWeight: 'bold'
    },
    headerButton:{
        textAlign: 'center',
        justifyContent: 'center',
        fontSize:18
    },
    role:{
        // backgroundColor: '#282c34',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:20,
        padding:3,
        margin: 2,
        height: 34,
    },
    itemText:{
        fontSize:16,
        fontWeight:'500'
    },
    content:{
        paddingLeft:10,
        paddingRight:10,
        backgroundColor: 'white'
    },
    text:{
        fontSize: 16,
        padding: 10,
    },
    seperator:{
        height:0.5,
        backgroundColor:'black',
        width:'100'
    }
})

export default Hierarchy;
