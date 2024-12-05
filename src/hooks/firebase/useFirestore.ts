import { useState } from 'react';
import {studentDocumentService, universityService} from "../../services/firebase/db.ts";
import {StudentDocument} from "../../types";

export const useStudentDocuments = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const getDocuments = async (userId: string) => {
        try {
            setLoading(true);
            return await studentDocumentService.getByUser(userId);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to fetch documents'));
            return [];
        } finally {
            setLoading(false);
        }
    };

    const addDocument = async (document: Omit<StudentDocument, 'id'>) => {
        try {
            setLoading(true);
            return await studentDocumentService.create(document);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to add document'));
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        getDocuments,
        addDocument,
        updateDocument: studentDocumentService.update.bind(studentDocumentService),
        deleteDocument: studentDocumentService.delete.bind(studentDocumentService),
        getRequiredDocuments: studentDocumentService.getRequired.bind(studentDocumentService),
    };
};

export const useUniversities = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const getUniversities = async () => {
        try {
            setLoading(true);
            return await universityService.getActive();
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to fetch universities'));
            return [];
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        getUniversities,
        getUniversityById: universityService.getById.bind(universityService),
        getByCountry: universityService.getByCountry.bind(universityService),
        getTopRanked: universityService.getTopRanked.bind(universityService),
    };
};
