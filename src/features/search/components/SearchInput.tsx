import { StyleSheet, TextInput } from 'react-native';
import { spacing } from '#shared/foundations';

type SearchInputProps = {
  value: string;
  onChangeText: (text: string) => void;
};

export default function SearchInput({ value, onChangeText }: SearchInputProps) {
  return (
    <TextInput
      style={styles.searchInput}
      value={value}
      onChangeText={onChangeText}
      placeholder="Search for a service..."
      placeholderTextColor="#999"
      autoCorrect={false}
    />
  );
}

const styles = StyleSheet.create({
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginBottom: spacing.md,
    fontSize: 16,
    backgroundColor: '#fff',
  },
});
