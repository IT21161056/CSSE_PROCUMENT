import axios from 'axios';
import { fetchSiteList } from '../screen/PlaceOrder'; // Adjust the import path accordingly
import { Ip } from '../Ip';

jest.mock('axios');

describe('fetchSiteList', () => {
    it('should fetch site list successfully', async () => {
        const mockData = [{ id: 1, name: 'Site 1' }];
        axios.get.mockResolvedValueOnce({ data: mockData });

        const result = await fetchSiteList();

        expect(result).toEqual(mockData);
        expect(axios.get).toHaveBeenCalledWith(`http://${Ip}:8072/site/`);
    });

    it('should handle error during site list fetch', async () => {
        const errorMessage = 'Failed to fetch site list';
        axios.get.mockRejectedValueOnce(new Error(errorMessage));

        try {
            await fetchSiteList();
        } catch (error) {
            expect(error.message).toBe(errorMessage);
        }

        expect(axios.get).toHaveBeenCalledWith(`http://${Ip}:8072/site/`);
    });
});
