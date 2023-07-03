import { Modal, View, Text, Pressable, StyleSheet, Image } from 'react-native';

export const EXAMPLE_TYPES = {
  CNIC_CARD: 'CNIC_CARD',
  CNIC_IN_HAND: 'CNIC_IN_HAND',
  PROOF_EMPLOYMENT: 'PROOF_EMPLOYMENT'
}

function ExampleImage({type}) {
  let example=<></>
  switch(type) {
    case EXAMPLE_TYPES.CNIC_CARD:
      example = <View style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
      }}>
         <Image
            source={require('@assets/example/info_example_cnic_card_positive.png')}
            contentFit="cover"
            transition={1000}
            style={{
              width: "270px",
              height: '170px',
            }}
        />
         <Image
            source={require('@assets/example/info_example_cnic_card_negative.png')}
            contentFit="cover"
            transition={1000}
            style={{
              width: "270px",
              height: '170px',
            }}
        />
      </View>
      break;
    case EXAMPLE_TYPES.CNIC_IN_HAND:
      example = <View style={{
        display: 'flex',
        flexDirection: 'column',
      }}>
         <Image
            source={require('@assets/example/info_example_cnic_hand_held.png')}
            contentFit="cover"
            transition={1000}
            style={{
              width: "270px",
              height: '170px',
            }}
        />
      </View>
      break;
    case EXAMPLE_TYPES.PROOF_EMPLOYMENT:
      example = <View style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
      }}>
        <Image
          source={require('@assets/example/info_example_work_card.png')}
          contentFit="cover"
          transition={1000}
          style={{
            width: "270px",
            height: '170px',
          }}
        />
        <Image
          source={require('@assets/example/info_example_work_scene.png')}
          contentFit="cover"
          transition={1000}
          style={{
            width: "270px",
            height: '170px',
          }}
        />
        <Image
          source={require('@assets/example/info_example_business_card.png')}
          contentFit="cover"
          transition={1000}
          style={{
            width: "270px",
            height: '170px',
          }}
        />
      </View>
      break;
  }
  return (
    <View>
      <Text style={styles.title}>Example</Text>
      {
        example
      }
    </View>
  )
 
}

export function ExampleModal({ isVisible, onClose, type }) {
  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View style={styles.container} >
        <View style={styles.content}>
          <ExampleImage type={type}/>
          <Pressable onPress={() => onClose('')}>
            <Text style={
              styles.closeBtn
            }>I Know</Text> 
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#25292e',
    borderRadius: '4px',
    gap:'15px'
  },
  content: {
    backgroundColor: 'white',
    borderRadius: '10px',
    paddingHorizontal: '15px',
    paddingVertical:"20px"
  },
  closeBtn: {
    width: '250px',
    height: '50px',
    backgroundColor: '#0825B8',
    color: 'white',
    fontSize: '16px',
    lineHeight: "50px",
    textAlign: 'center',
    marginTop: '20px',
    alignSelf: 'center',
    borderRadius: '4px'
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '16px',
  }
});
