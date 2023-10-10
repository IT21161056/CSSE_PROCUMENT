import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TextInput, Alert, SafeAreaView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { SelectList } from 'react-native-dropdown-select-list'
import Icon from "react-native-vector-icons/Ionicons";

export default function PlaceOrder() {

  const navigation = useNavigation();

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const dt = new Date(date)
    const rdate = dt.toISOString().split("T");
    const newdate = rdate[0].split('-');
    setSelectedDate(newdate[2] + '/' + newdate[1] + '/' + newdate[0])
    hideDatePicker();
  };

  const [order, setOrder] = useState([])

  const [site, setSite] = useState();
  const [selectedDate, setSelectedDate] = useState('required Date')
  const [supplier, setSupplier] = useState();
  const [product, setProduct] = useState();
  const [qnty, setQnty] = useState();
  const [price, setPrice] = useState(0)
  const [prods, setProds] = useState([])


  const handleOrder = () => {
    const newOrder = {
      site: sites.find(item => item.key === site).value,
      selectedDate,
      prods
    };

    setOrder([...order, newOrder]);
    navigation.navigate('Place2', { order })
    setSupplier("");
    setProduct("");
    setQnty("");

  };

  //add repeatedly supplier product and quantity
  const handleProducts = () => {
    if (supplier && product && qnty) {
      // Find the selected product and its price
      const selectedProduct = products.find(item => item.key === product);
      
      // Find the selected supplier and its price
      const selectedSupplier = suppliers[product].find(item => item.key === supplier);
      
      if (selectedProduct && selectedSupplier) {
        const newItem = {
          product: selectedProduct.value,
          supplier: selectedSupplier.value,
          qnty,
          price: selectedSupplier.price  // Set the product price
        };
  
        setProds([...prods, newItem]);
        Alert.alert('Product added successfully');
        setSupplier(null);
        setQnty('');
      }
    }
  };
  

  // console.log(prods)
  const sites = [
    { key: 's1', value: 'Colombo' },
    { key: 's2', value: 'Kandy' },
    { key: 's3', value: 'Kurunegala' },
    { key: 's4', value: 'Galle' }
  ]


  const products = [
    { key: '1', value: 'metal'},
    { key: '2', value: 'sand' },
    { key: '3', value: 'cement' },
    { key: '4', value: 'paint'},
    { key: '5', value: 'bricks' },
    { key: '6', value: 'iron bars' },
  ]

  const suppliers = {
    '1': [
      { key: '7', value: 'kamal hardware', price: 380  },
      { key: '8', value: 'sachin hardware', price: 450 },
    ],
    '2': [
      { key: '9', value: 'pasindu hardware', price: 1500 },
      { key: '10', value: 'nimal hardware', price: 500  },
    ],
    '3': [
      { key: '11', value: 'saman hardware', price: 420 },
      { key: '12', value: 'viraj hardware', price: 310 },
    ],
    '4': [
      { key: '13', value: 'ganidu hardware', price: 560 },
      { key: '14', value: 'ravin hardware', price: 680},
    ],
    '5': [
      { key: '15', value: 'namal hardware', price: 570 },
      { key: '16', value: 'anoj hardware', price: 630 },
    ],
    '6': [
      { key: '17', value: 'nirmal hardware', price: 780 },
      { key: '18', value: 'dasun hardware', price: 670 },
    ]
  }

  const selectedSuppliers = suppliers[product] || [];
const suppliersData = selectedSuppliers.map(item => ({
  key: item.key,
  value: `${item.value} - Rs. ${item.price}`
}));

  return (
    <SafeAreaView>
      <Text style={styles.place}>Place Order</Text>

      <View style={{ marginTop: 50, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, fontWeight: "600", marginRight: 20, marginLeft: -240, top: -13 }}>Select Site</Text>
        <SelectList
          setSelected={(val) => setSite(val)}
          data={sites}
          placeholder="Select supplier"
          boxStyles={{ borderColor: '#ffa366', height: 50, width: 350, top: -10 }}
        />
      </View>

      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => { showDatePicker() }}>
          <Text style={{ fontSize: 18, fontWeight: "600", marginLeft: 15 }}>Required date</Text>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
          <TextInput style={styles.input1} placeholder="date" value={selectedDate} />
        </TouchableOpacity>
      </View>

      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, fontWeight: "600", marginLeft: -230, bottom: 8 }}>Select product</Text>
        <SelectList
          setSelected={(val) => setProduct(val)}
          data={products}
          placeholder="Select product"
          boxStyles={{ borderColor: '#ffa366', height: 50, width: 350 }}
        />
      </View>

      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, fontWeight: "600", bottom: 3, marginRight: -45, marginTop: 13, marginLeft: -280 }}>Select supplier</Text>
        <SelectList
          setSelected={(val) => setSupplier(val)}
          data={suppliersData}
          placeholder="Select supplier"
          boxStyles={{ borderColor: '#ffa366', marginTop: 5, height: 50, width: 350 }}
        />
      </View>

      <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 3 }}>
        <Text style={{ fontSize: 18, fontWeight: "600", marginLeft: -280 }}>Quantity</Text>
        <TextInput style={styles.input} placeholder="Quantity" onChangeText={(text) => setQnty(text)} />
      </View>

      <View style={{ marginLeft: 180 }}>

        <TouchableOpacity onPress={handleProducts} style={{ backgroundColor: '#ffe6cc', height: 50, width: 50, borderRadius: 50, justifyContent: 'center' }}>
          <Icon name="add" style={{ marginLeft: 10, color: '#00004d' }} size={32} color="#4F8EF7" />
        </TouchableOpacity>
        <Text style={{ marginLeft: 60, bottom: 34, color: 'gray' }}>Add more products</Text>
      </View>


      <View style={styles.rds}>
        <Button onPress={handleOrder} style={styles.nxt} title="Next" color='#ffa366' />
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input1: {
    height: 50,
    margin: 12,
    width: 350,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    borderColor: '#ffa366',
  },
  place: {
    marginLeft: 130,
    fontSize: 27,
    top: 20
  },
  rds: {
    marginLeft: 80,
    marginRight: 80,
    marginTop: 10,
    color: '#ffa366',
    gap: 5,
  },
  container1: {
    flex: 1,
    padding: 20,
  },
  selectContainer: {
    marginBottom: 20,
  },
  inputs: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  container: {
    padding: 16,
    margin: 25,
    borderColor: '#ffa366',
    gap: 15,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 10,
    borderWidth: 1
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  input: {
    height: 50,
    margin: 12,
    width: 350,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    borderColor: '#ffa366'
  },

});