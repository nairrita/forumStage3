import * as React from "react";
import {
  TouchableOpacity,
  Text,
  View,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
  Alert,
  KeyboardAvoidingView
} from "react-native";
import { Badge, Icon, Header, ListItem } from "react-native-elements";
import firebase from "firebase";
import db from "../config";
import { RFValue } from "react-native-responsive-fontsize";
import { Dropdown } from "react-native-material-dropdown";
import { FontAwesome5 } from "@expo/vector-icons";

export default class DataScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matter: "",
      topic: "",
      name: "",
      category: "AADHAR Card",
      item: this.props.navigation.getParam("data")
    };
    this.blogRef = null;
  }

  getBlogTopic = () => {
    this.blogRef = db
      .collection("aadhar_card_blogs")
      .where("category", "==", this.state.category)
      .where("topic", "==", this.state.topic)
      .onSnapshot(snapshot => {
        var topic = snapshot.docs.map(document => document.data());
        this.setState({
          topic: topic
        });
      });
  };

  getBlogName = () => {
    this.blogRef = db
      .collection("aadhar_card_blogs")
      .where("category", "==", this.state.category)
      .where("user_name", "==", this.state.name)
      .onSnapshot(snapshot => {
        var name = snapshot.docs.map(document => document.data());
        this.setState({
          name: name
        });
      });
  };

  getBlogMatter = () => {
    // this.blogRef = db
    //   .collection("aadhar_card_blogs")
    //   .where("category", "==", this.state.category)
    //   .where("matter", "==", this.state.matter)
    //   .onSnapshot(snapshot => {
    //     var topic = snapshot.docs.map(document => document.data());
    //     this.setState({
    //       topic: topic
    //     });
    //   });
  };

  // componentDidMount() {
  //   this.getBlogMatter();
  // }

  render() {
    console.log(this.state.item);
    const { item } = this.state;
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={"#00adb5"}
          containerStyle={styles.header}
          centerComponent={{
            text: this.state.topic,
            style: {
              flex: 1,
              color: "#fff",
              fontWeight: "bold",
              fontStyle: "italic",
              fontSize: RFValue(30)
            }
          }}
        />
        <Text style={{ color: "#fff" }}>{item.category}</Text>

        <Text style={{ color: "#fff", marginTop: 5, fontSize: 40 }}>
          {item.category}
        </Text>
        <Text style={{ color: "#fff" }}>{item.matter}</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.props.navigation.navigate("AadharCard");
          }}
        >
          <Text style={styles.buttonText}>{this.state.name}</Text>
          <Text style={styles.buttonText}>{this.state.matter}</Text>
          <Text style={styles.buttonText}>Back to Home</Text>
          <FontAwesome5 name="home" size={50} color="black" />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222831"
  },
  button: {
    backgroundColor: "#00adb5",
    borderWidth: RFValue(2),
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginTop: RFValue(20),
    borderRadius: RFValue(5)
  },
  buttonText: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: RFValue(20),
    fontStyle: "italic",
    alignItems: "center"
  },
  inputBox: {
    backgroundColor: "#00adb5",
    borderColor: "#eeeeee",
    borderRadius: RFValue(5),
    borderWidth: RFValue(2),
    width: RFValue(300),
    height: RFValue(50),
    marginTop: RFValue(5)
  },
  header: {
    flex: 0.12,
    width: RFValue(500)
  },
  titleStyle: {
    fontSize: RFValue(20),
    textAlign: "center"
  }
});
