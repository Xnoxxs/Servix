import {
  FlatList,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { ScreenContainer, Typography } from '#shared/elements';
import { colors, spacing } from '#shared/foundations';
import ServiceRequestCard from '../components/ServiceRequestCard';
import ServiceRequestForm from '../components/ServiceRequestForm';
import { useRequests } from '../hooks/useRequests';

export default function RequestsScreen() {
  const { requests, createRequest } = useRequests();

  const listHeader = (
    <View style={styles.contentHeader}>
      <ServiceRequestForm onSubmit={createRequest} />

      <Typography variant="title" style={styles.sectionTitle}>
        Submitted Requests
      </Typography>
    </View>
  );

  return (
    <ScreenContainer>
      <View style={styles.headerWrapper}>
        <SafeAreaView style={styles.headerSafe}>
          <View style={styles.headerContent}>
            <Typography variant="heading" color={colors.white}>
              Requests
            </Typography>
            <Typography variant="body" color={colors.primaryLight}>
              Submit and review service requests
            </Typography>
          </View>
        </SafeAreaView>
      </View>

      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContent}
        data={requests}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={listHeader}
        renderItem={({ item }) => <ServiceRequestCard request={item} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Typography variant="caption">
              No service requests submitted yet.
            </Typography>
          </View>
        }
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    backgroundColor: colors.primary,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerSafe: {
    backgroundColor: colors.primary,
  },
  headerContent: {
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  list: {
    flex: 1,
  },
  listContent: {
    padding: spacing.lg,
  },
  contentHeader: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    marginTop: spacing.xl,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
});
