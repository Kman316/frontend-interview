import styles from "./SingleApplication.module.css";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0"); 
  const year = date.getFullYear(); 

  return `${day}-${month}-${year}`; 
};

const SingleApplication = ({ application }) => {
  return (
    <div className={styles.SingleApplication}>
      <div className={styles.cell}>
        <sub>Company</sub>
        {application.company}
      </div>
      <div className={styles.cell}>
        <sub>Name</sub>
        {application.first_name} {application.last_name}
      </div>
      <div className={styles.cell}>
        <sub>Email</sub>
        <a href={`mailto:${application.email}`} className={styles.email}>
          {application.email}
        </a>
      </div>
      <div className={styles.cell}>
        <sub>Loan Amount</sub>
        {`£${application.loan_amount.toLocaleString()}`}
      </div>
      <div className={styles.cell}>
        <sub>Application Date</sub>
        {formatDate(application.date_created)}
      </div>
      <div className={styles.cell}>
        <sub>Expiry date</sub>
        {formatDate(application.expiry_date)}
      </div>
    </div>
  );
};

export default SingleApplication;
