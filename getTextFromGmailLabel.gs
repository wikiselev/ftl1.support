function deleteDocByName(fileName){
  var docs=DocsList.find(fileName)
  for(n=0;n<docs.length;++n){
    if(docs[n].getName() == fileName){
      var ID = docs[n].getId()
      DocsList.getFileById(ID).setTrashed(true)
    }
  }
}

function getTextFromHtml(html) {
  return getTextFromNode(Xml.parse(html, true).getElement());
}

function getTextFromNode(x) {
  switch(x.toString()) {
    case 'XmlText': return x.toXmlString();
    case 'XmlElement': return x.getNodes().map(getTextFromNode).join('');
    default: return '';
  }
}

function getInfoFromEmails(labelName) {
  deleteDocByName("pravdina-info")
  var doc = DocumentApp.create("pravdina-info");
  // get the label for given name
  var label = GmailApp.getUserLabelByName("pravdina");
  // get count of all threads in the given label
  var threads = label.getThreads();
  var messages = GmailApp.getMessagesForThreads(threads);
  var count = 1;
  
  for (var i = messages.length - 1 ; i >= 0; i--) {
    for (var j = 0; j < messages[i].length; j++) {
      doc.appendParagraph(count);
      count++;
      doc.appendParagraph(getTextFromHtml(messages[i][j].getBody()));
    }
  }
};
