import '../styles/Hierarchy.css';
import {employeeList} from '../dataArrays/userArrays'
import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, LayoutAnimation } from  'react-native'

function createTree(){
    let positions = {};
    let roots = [];

    employeeList.forEach((employee,i) => {
        positions[employee.EmployeeNumber] = i;
        employee.children = [];
    });

    employeeList.forEach((employee) => {
        if(employee.ReportingLine === -1){
            roots.push(employee)
            return
        }
        const parent = employeeList[positions[employee.ReportingLine]]
        parent.children = [...(parent.children), employee]
    });

    let content = []

    roots.forEach(employee => {
        content.push({
            isExpanded:false, category: `${employee.EmployeeNumber}`, items: [employee]
        })
    });

    return content
}

function TopLevelStaff(props){
    const [layoutHeight, setlayoutHeight] = useState(0)
    const role = props.employee
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
                    <span className={`role-${role.items[0].Role}`}>{role.items[0].Role}</span> 
                    <span className='NameNumber'> {role.items[0].Name} {role.items[0].Surname}</span>
                    <span className='Salary'>R{role.items[0].Salary}.00</span>
                </Text>
            </TouchableOpacity>
            <View style={{height:layoutHeight,overflow:'hidden'}}>
                {
                    role.items[0].children.map((employee,key) => {
                        return (
                            <NextLevelStaff key={key} employee={employee} />
                        )
                    })
                }
            </View>
        </View>
    )
}

function Employee(props){
    const employee = props.employee
    //const hasChildren = employee.children.length !== 0;
    return (
        <Text style={styles.itemText}>
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
    },[employee.isExpanded=true])

    const branches = () =>{
        if(employee.children.length !== 0){
            return employee.children.map((emp,key) => 
                <NextLevelStaff key={key} employee={emp} level={level+1}/>
            )
        }

        return null
    }

    return (
        <>
            <TouchableOpacity style={styles.role} onPress={func}>
                <Employee employee ={employee} level={level}/>
            </TouchableOpacity>
            <View style={{height:layoutHeight,overflow:'hidden'}}>
                {
                    branches()
                }
            </View>
        </>

    )
}

function Hierarchy() {
    const content = createTree()
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
                            List of Top Earners per Role (click to expand)
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
