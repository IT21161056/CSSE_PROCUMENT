import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, TextInput, Alert, SafeAreaView, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { SelectList } from 'react-native-dropdown-select-list'
import Icon from "react-native-vector-icons/Ionicons";
import axios from 'axios'
import { Ip } from '../Ip'

export default function UpdateOrder({ route }) {
  const { params } = useRoute();
  let item = params;
  const { orderId } = route.params;
  const navigation = useNavigation();

  const [updateOrder,setUpdateOrder] = useState([])
  const [order, setOrder] = useState([]);
  const [value, setValue] = useState(null);
  const [total, setTotal] = useState(0);
  const [productList, setProductList] = useState([])
  const [sitelist, setSites] = useState([])
  const [supplierlist, setSupplierList] = useState([])
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [siteInfo, setSiteInfo] = useState({ key: value, name: '' });

  const [requiredDate, setSelectedDate] = useState('required Date')
  const [supplier, setSupplier] = useState();
  const [product, setProduct] = useState();
  const [qnty, setQnty] = useState();
  const [price, setPrice] = useState(0)
  const [prods, setProds] = useState([])
  const [date, setDate] = useState(null);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const siteNames = sitelist.map((site) => ({
    key: site._id,
    value: site.siteName,
  }));

  const productNames = productList.map((product) => (product.productName))
  const supList = supplierlist.flatMap((supplier) => {
    return supplier.productList.map((product) => ({
      value: `${supplier.supplierName} Rs. ${product.price}.00`,
      label: supplier._id
    }));
  });

  //fetching site list
  const fetchSiteList = async () => {
    try {
      const res = await axios.get(`http://${Ip}:8072/site/`)
      const data = res.data;
      return (data)
    } catch (error) {
      console.error("Error fetching site list:", error);
      throw error;
    }
  };

  //fetch product list
  const fetchProductList = async () => {
    try {
      const res = await axios.get(`http://${Ip}:8072/product/`)
      const data = res.data;
      return (data)
    } catch (error) {
      console.error("Error fetching product list:", error);
      throw error;
    }
  };


  useEffect(() => {
    fetchSiteList().then((data) => setSites(data));
    fetchProductList().then((data) => setProductList(data));
  }, [])


  const handleConfirm = (date) => {
    const dt = new Date(date)
    const rdate = dt.toISOString().split("T");
    const newdate = rdate[0].split('-');
    setSelectedDate(newdate[2] + '/' + newdate[1] + '/' + newdate[0])
    hideDatePicker();
  };


  const handleOrder = () => {
    const calculatedTotal = calculateTotal(prods);
    if (siteInfo && requiredDate && prods && prods.length > 0) {
      const newOrder = {
        siteName: siteInfo.value,
        siteId: siteInfo.key,
        placedDate: date,
        requiredDate,
        productList: prods,
        totalPrice: calculatedTotal
      };
      setTotal(calculatedTotal);
      setOrder([...order, newOrder]);
      setSupplier("");
      setProduct("");
      setQnty("");
      navigation.navigate('Place2', { order: [...order, newOrder] });
    } else {
      Alert.alert("All fields are required")
    }
  };


  const handleProducts = () => {
    if (supplier && product && qnty) {
      const newItem = {
        product: product,
        supplierName: supplier.name,
        supplier: supplier.id,
        qnty,
        price
      };
      setProds([...prods, newItem]);
      Alert.alert('Product added successfully');
      setSupplier(null);
      setQnty('');
    }
  };

  //fetch the suppliers list when site manager select the product
  const getSupplierByProduct = async (itemName) => {
    setProduct(itemName)
    try {
      const res = await axios.get(`http://${Ip}:8072/supplier/byItem?itemName=${itemName}`)
      setSupplierList(res.data)

    } catch (error) {
      console.error("Error fetching product list:", error);
      throw error;
    }
  }

  const handleSelect = (val) => {
    const selectedProduct = supList.find((product) => product.value === val);
    if (selectedProduct) {
      const supplierName = selectedProduct.value.split(' Rs. ')[0];
      const priceMatch = selectedProduct.value.match(/Rs\. (\d+\.\d+)/);
      const selectedPrice = priceMatch ? parseFloat(priceMatch[1]) : 0;
      const supplierId = selectedProduct.label;
      setSupplier({ name: supplierName, id: supplierId });
      setPrice(selectedPrice);
    }
  };


  useEffect(() => {
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    setDate(date);
  }, []);


  //calculate cost for the order
  const calculateTotal = (prods) => {
    let total = 0;
    prods.forEach((product) => {
      total += product.price * product.qnty;
    });
    return total;
  };
  

  const sendRequest = async () => {
    try {
      const response = await axios.get(`http://${Ip}:8072/order/${orderId}`);
      setUpdateOrder(response.data);
    } catch (error) {
      Alert.alert("Error with fetching Order List");
      console.error(error);
      return null;  // Return null if there's an error
    }
  }

  useEffect(() => {
    sendRequest()
  }, [])

  return (
    <SafeAreaView>
    <Text style={styles.place}>Place Order</Text>

    <View style={styles.selectSite}>
      <Text style={styles.selectText}>Select Site</Text>
      <SelectList
        setSelected={(val) => {
          const selectedSite = sitelist.find(item => item._id === val);
          const value = selectedSite ? selectedSite.siteName : 'Unknown Site';
          setSiteInfo({ key: val, value });
        }}
        data={siteNames}
        placeholder="Select supplier"
        boxStyles={styles.siteBox}
      />
    </View>

    <View style={styles.rdate}>
      <TouchableOpacity onPress={() => { showDatePicker() }}>
        <Text style={styles.rdatetxt}>Required date</Text>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <TextInput style={styles.input1} placeholder="date" value={requiredDate} />
      </TouchableOpacity>
    </View>

    <View style={styles.productselect}>
      <Text style={styles.productText}>Select product</Text>
      <SelectList
        setSelected={(val) => getSupplierByProduct(val)}
        data={productNames}
        placeholder="Select product"
        boxStyles={styles.productBox}
      />
    </View>

    <View style={styles.suppplierView}>
      <Text style={styles.supplierText}>Select supplier</Text>
      <SelectList
        setSelected={(val) => handleSelect(val)}
        data={supList}
        placeholder="Select supplier"
        boxStyles={styles.supplierBox}
      />
    </View>

    <View style={styles.qnty}>
      <Text style={styles.qntyText}>Quantity</Text>
      <TextInput style={styles.input} placeholder="Quantity" onChangeText={(text) => setQnty(text)} />
    </View>

    <View style={styles.ad}>
      <TouchableOpacity onPress={handleProducts} style={styles.ad1}>
        <Icon name="add" style={styles.ad2} size={32} color="#4F8EF7" />
      </TouchableOpacity>
      <Text style={styles.ad3}>Add more products</Text>
    </View>

    <View style={styles.rds}>
      <Button onPress={handleOrder} style={styles.nxt} title="Next" color='#ffa366' />
    </View>

  </SafeAreaView>
  );

}

const styles = StyleSheet.create({

  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  input1: {
    height: 50,
    margin: 12,
    width: 350,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    borderColor: '#ffa366',
  },
  ad: {
    marginLeft: 180
  },
  place: {
    marginLeft: 130,
    fontSize: 27,
    top: 20
  },
  ad1: {
    backgroundColor: '#ffe6cc',
    height: 50,
    width: 50,
    borderRadius: 50,
    justifyContent: 'center'
  },
  ad2: {
    marginLeft: 10,
    color: '#00004d'
  },
  ad3: {
    marginLeft: 60,
    bottom: 34,
    color: 'gray'
  },
  productBox: {
    borderColor: '#ffa366',
    height: 50,
    width: 350
  },
  qnty: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 3
  },
  rds: {
    marginLeft: 80,
    marginRight: 80,
    marginTop: 10,
    color: '#ffa366',
    gap: 5,
  },
  addmore: {
    backgroundColor: '#ffe6cc',
    height: 50,
    width: 50,
    borderRadius: 50,
    justifyContent: 'center'
  },
  qntyText: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: -280
  },
  suppplierView: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  supplierText: {
    fontSize: 18,
    fontWeight: "600",
    bottom: 3,
    marginRight: -45,
    marginTop: 13,
    marginLeft: -280
  },
  selectSite: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  supplierBox: {
    borderColor: '#ffa366',
    marginTop: 5,
    height: 50,
    width: 350
  },
  selectText: {
    fontSize: 18,
    fontWeight: "600",
    marginRight: 20,
    marginLeft: -240,
    top: -13
  },
  container1: {
    flex: 1,
    padding: 20,
  },
  rdate: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  rdatetxt: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 15
  },
  productselect: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  productText: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: -230,
    bottom: 8
  },
  siteBox: {
    borderColor: '#ffa366',
    height: 50,
    width: 350,
    top: -10
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
  

})