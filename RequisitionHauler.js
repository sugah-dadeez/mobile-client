/**
 * VerificationCodeInput Component
 */

import React from 'react';
import {Text} from 'react-native';

/**
 *
 */
export default class RequisitionHauler extends React.Component {
  /**
   *
   * @param props
   */
  constructor(props) {
    super(props);

  }

  /**
   *
   * @returns {XML}
   */
  render() {

    return (
        <View style={styles.container}>
          <Text>Requisition A Hauler</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
