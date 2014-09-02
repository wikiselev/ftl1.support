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
  // get count of last 200 threads in the given label
  var threads = GmailApp.getUserLabelByName("pravdina").getThreads(0, 200);
  var messages = GmailApp.getMessagesForThreads(threads);
//  var count = 1;
  
//  Logger.log(messages.length);
//  output messages in the reverse order
  for (var i = messages.length - 1 ; i >= 0; i--) {
    for (var j = 0; j < messages[i].length; j++) {
//      doc.appendParagraph(count);
//      count++;
      doc.appendParagraph(getTextFromHtml(messages[i][j].getBody()));
    }
  }
};
