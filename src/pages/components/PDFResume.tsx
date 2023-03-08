import { Document, Font, Page, StyleSheet, Text } from "@react-pdf/renderer";

const PDFResume = () => {
  return (
    <Document>
      <Page style={styles.body}>
        <Text>Section #1</Text>
      </Page>
    </Document>
  );
};

Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
});

export default PDFResume;
