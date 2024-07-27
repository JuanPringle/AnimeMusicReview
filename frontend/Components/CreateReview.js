import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

function CreateReview() {
  const [score, setScore] = useState('1');
  const [reviewText, setReviewText] = useState('');

  const handleReviewSubmit = () => {
    // Handle the review submission logic
    console.log('Review submitted:', { score, reviewText });
    // Reset the form
    setScore('1');
    setReviewText('');
  };

  return (
    <View style={styles.additionalContent}>
      <Text style={styles.title}>Review the Music</Text>
      <View style={styles.selectContainer}>
        <select 
          onChange={(e) => setScore(e.target.value)} 
          value={score} 
          className="border-2 border-text p-1 bg-background rounded-lg font-semibold"
          style={styles.select}
        >
          {[...Array(10).keys()].map(i => (
            <option key={i+1} className="bg-background text-text" value={i+1}>{i+1}</option>
          ))}
        </select>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Write your review here"
        placeholderTextColor="#888"
        multiline
        value={reviewText}
        onChangeText={setReviewText}
      />
      <Button title="Submit Review" onPress={handleReviewSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  additionalContent: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    margin: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  selectContainer: {
    marginBottom: 10,
  },
  select: {
    width: 100, // Fixed width for the select element
  },
  input: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    textAlignVertical: 'top',
    marginBottom: 10,
  },
});

export default CreateReview;