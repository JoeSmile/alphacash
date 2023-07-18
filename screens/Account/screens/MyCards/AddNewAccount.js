/* tslint:disable:no-console */
import React, { useMemo } from 'react'
import { ScrollView, Text, TouchableOpacity, View, Image, StyleSheet } from 'react-native'
import { Tabs } from '@ant-design/react-native'

const tabs = [{
  title: 'Easypaisa',
  source: require("@assets/images/loan_ic_easypaisa.png")
},
{
  title: 'Jazzcash',
  source: require("@assets/images/loan_ic_jazzcash.png")
},{
  title: 'Bank Card',
  source: require("@assets/images/loan_ic_bank.png")
}]

const style = {
  backgroundColor: '#fff',
  flex: 1
}

const noticeStyle = {
  color: '#8899AC',
  fontSize: 12,
  lineHeight: 20
}

function Notice () {
  return <View>
    <Text style={noticeStyle}>
    Notice:
    </Text>
    <Text style={noticeStyle}>
      1. Please fill in your collection account number. When your application is approved, the loan will be issued to your collection account number. Please check the collection account number carefully to avoid unsuccessful payment;
    </Text>
    <Text style={noticeStyle}>
      2. You can apply for the first loan after the receiving account is successfully added;
    </Text>
    <Text style={noticeStyle}>
      3. When you fill in Jazzcash as the receiving account number, please fill in the Jazzcash account number that matches your CNIC, otherwise the payment will not be successful.
    </Text>
  </View>
}

export function AddNewAccount() {

  return (
    <View style={{ flex: 1,  backgroundColor: 'white', padding: 15 }}>
      <Tabs tabs={tabs} 
        renderTabBar={(tabProps) => (
          <View
            style={{
              paddingHorizontal: 16,
              paddingTop: 15, 
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}>
            {tabProps.tabs.map((tab, i) => (
              // change the style to fit your needs
              <TouchableOpacity
                activeOpacity={0.9}
                key={tab.key || i}
                style={{
                  paddingHorizontal: 15,
                  borderBottomWidth: tabProps.activeTab === i ? 2 : 0,
                  borderBottomColor: '#0825B8'
                }}
                onPress={() => {
                  const { goToTab, onTabClick } = tabProps
                  onTabClick && onTabClick(tabs[i], i)
                  goToTab && goToTab(i)
                }}>
                  <View key={tab.title} style={styles.tab}> 
                    <Image source={tab.source}
                      contentFit="cover"
                      transition={200}
                      style={{ width: 32, height: 32, marginBottom: 10}} 
                    />
                    <Text style={{
                      color: tabProps.activeTab === i ? '#0A233E' : '#8899AC',
                      fontWeight: 'bold',
                      fontSize: 16,
                    }}>
                    {tab.title}
                    </Text>
                  </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      >
        <View style={style}>
          <Text>Content of First Tab</Text>
          <Notice />
        </View>
        <View style={style}>
          <Text>Content of Second Tab</Text>
          <Notice />
        </View>
        <View style={style}>
          <Text>Content of Third Tab</Text>
          <Notice />
        </View>
      </Tabs>
    </View>
  )
}

const styles = StyleSheet.create({
  tab: {
   height: 70,
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: 'white'
  },
 
});
