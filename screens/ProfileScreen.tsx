// import React from 'react';
// import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView } from 'react-native';

// const ProfileScreen = () => {
//     return (
//         // SafeAreaView is good practice for mobile screens
//         <SafeAreaView style={styles.safeArea}>
//             {/* ScrollView allows the content to be scrollable if it exceeds screen height */}
//             <ScrollView contentContainerStyle={styles.container}>
                
//                 {/* Profile Picture */}
//                 <Image
//                     style={styles.profileImage}
//                     source={{ uri: '[YOUR_PROFILE_IMAGE_URL]' }} 
//                     // Use require('./path/to/your/local/image.jpg') for a local asset
//                 />
                
//                 {/* Name and Title */}
//                 <Text style={styles.nameText}>[Your Name]</Text>
//                 <Text style={styles.titleText}>[Your Profession/Title]</Text>

//                 {/* Separator Line */}
//                 <View style={styles.separator} />

//                 {/* About Section */}
//                 <View style={styles.section}>
//                     <Text style={styles.sectionHeader}>About Me</Text>
//                     <Text style={styles.sectionContent}>
//                         I am a passionate [Developer/Designer/Student] working with React Native. 
//                         I enjoy creating seamless mobile experiences and constantly learning new technologies.
//                     </Text>
//                 </View>

//                 {/* Contact/Links Section (Example) */}
//                 <View style={styles.section}>
//                     <Text style={styles.sectionHeader}>Connect</Text>
//                     <Text style={styles.sectionContent}>Email: your.email@example.com</Text>
//                     <Text style={styles.sectionContent}>GitHub: @YourUsername</Text>
//                 </View>

//             </ScrollView>
//         </SafeAreaView>
//     );
// };

// const styles = StyleSheet.create({
//     safeArea: {
//         flex: 1,
//         backgroundColor: '#f9f9f9', // Light background
//     },
//     container: {
//         padding: 20,
//         alignItems: 'center', // Center items horizontally
//     },
//     profileImage: {
//         width: 120,
//         height: 120,
//         borderRadius: 60, // Makes it circular
//         marginBottom: 15,
//         borderWidth: 3,
//         borderColor: '#007AFF', // A nice blue border
//     },
//     nameText: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         color: '#333',
//     },
//     titleText: {
//         fontSize: 16,
//         color: '#666',
//         marginBottom: 20,
//     },
//     separator: {
//         height: 1,
//         width: '80%',
//         backgroundColor: '#ddd',
//         marginVertical: 20,
//     },
//     section: {
//         width: '100%',
//         marginBottom: 20,
//     },
//     sectionHeader: {
//         fontSize: 18,
//         fontWeight: '600',
//         color: '#007AFF',
//         marginBottom: 5,
//         borderBottomWidth: 1,
//         borderBottomColor: '#eee',
//         paddingBottom: 5,
//     },
//     sectionContent: {
//         fontSize: 16,
//         color: '#444',
//         lineHeight: 22,
//         paddingLeft: 5,
//     },
// });

// export default ProfileScreen;