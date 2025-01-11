import { useState, useEffect } from "react";
import SingleApplication from "./SingleApplication";
import styles from "./Applications.module.css";
import { Button } from './ui/Button/Button';

const Applications = () => {
  const [applications, setApplications] = useState<any[]>([]);  
  const [page, setPage] = useState(1);  
  const [isLoading, setIsLoading] = useState(false);  
  const [hasMore, setHasMore] = useState(true);

  const fetchApplications = async (page: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3001/api/applications?_page=${page}&_limit=5`
      );
      const data = await response.json();
      const linkHeader = response.headers.get("Link");
      
      const nextPage = linkHeader?.includes('rel="next"') ? true : false;
      
      // Update the state with the new applications
      setApplications((prev) => [...prev, ...data]);
      setHasMore(nextPage);  // Check if there's a next page based on the Link header
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications(page);  // Fetch applications on page load
  }, [page]);

  const loadMoreApplications = () => {
    if (!isLoading && hasMore) {
      setPage((prevPage) => prevPage + 1);  // Increment page number
    }
  };

  return (
    <div className={styles.Applications}>
      {applications.map((application, index) => (
        <SingleApplication key={index} application={application} />
      ))}
      {hasMore && (
        <div className={styles.buttonWrapper}>
        <Button
          onClick={loadMoreApplications}
          disabled={isLoading}
          className={styles.loadMoreButton}
        >
          {isLoading ? "Loading..." : "Load More"}
        </Button>
      </div>
      )}
    </div>
  );
};

export default Applications;
